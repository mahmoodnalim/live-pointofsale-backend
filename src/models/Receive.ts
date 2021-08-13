import IReceive from '../interfaces/IReceive';
import Receive from '../db/Receive';
import Supplier from '../db/Supplier';
import ItemReceiving from '../db/ItemReceiving';
import Sequelize from 'sequelize';
import Item from '../db/Item';
import CashBook from '../db/CashBook';
import ItemStats from '../db/ItemStat';
import SupplierDue from '../db/SupplierDue';

const Op = Sequelize.Op;

const getReceivingOptions = {
  include: [
    {
      model: Supplier,
      as: 'supplier',
      attributes: ['firstName', 'lastName', 'companyName'],
    },
    {
      model: ItemReceiving,
      as: 'itemReceivings',
      attributes: ['discount', 'quantity', 'receivePrice', 'itemId'],
      include: [
        {
          model: Item,
          as: 'item',
          attributes: ['itemName'],
        },
      ],
    },
  ],
  attributes: ['total', 'totalDiscount', 'paymentType'],
};

export async function getAllReceivings(dates: any) {
  const { date1, date2 } = dates;
  let date = '';
  let dateFilters = {};
  if (date1 && date2) {
    dateFilters = {
      createdAt: {
        [Op.lt]: date1,
        [Op.gt]: date2,
      },
    };
    date = `Between ${date1} and ${date2}`;
  } else {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    };
    date = `Today`;
  }
  const allReceives = await Receive.findAll({ where: dateFilters });
  const receiveSummary = await Receive.findAll({
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'receivesCount'],
      [Sequelize.fn('SUM', Sequelize.col('total')), 'totalOfAllReceives'],
    ],
  });
  return [[...receiveSummary], date, [...allReceives]];
}

export async function getReceiving(id: number) {
  return await Receive.findByPk(id, getReceivingOptions);
}

export async function createReceiving(receive: IReceive) {
  return await Receive.create(receive);
}

export async function getLastReceiveId() {
  const id = await Receive.findOne({
    attributes: [[Sequelize.fn("MAX", Sequelize.col("id")), "LastSaleId"]],
  });
  return id;
}

export async function findLatestItemReceiveByItemId(itemId: any) {
  const latestItemStat = await ItemReceiving.findAll({
    attributes: ["quantity", "receivePrice", "discount"],
    where: { itemId },
    order: [
      ['createdAt', 'desc']
    ],
    limit: 1
  })

  return latestItemStat;
}

export const handleItemReceiveOnReceive = async (
  itemReceives: any,
  receive: any
) => {
  itemReceives.forEach(async (itemReceive: any) => {
    try {
      const {
        itemId,
        receivePrice,
        quantity,
        discount,
      } = itemReceive;

      const itemReceiveDetails = {
        receiveId: receive.toJSON().id,
        itemId,
        receivePrice,
        discount,
        quantity,
        description: "",
      };
      const itemReceiveResult = await ItemReceiving.create(itemReceiveDetails);
      if (!itemReceiveResult) {
        throw new Error('Unable to create the  item receive');
      }
    } catch (ex) {
      console.log(ex);
    }
  });

};

export const handleCashBookOnReceive = async (amountDetails: any, receive: any) => {
  if (amountDetails.paymentType.cash) {
    try {
      const { paymentType } = amountDetails;
      const type = "CREDIT";
      const description = "CASH";
      const amount = paymentType.cash;
      const refNo = 'R_' + receive.toJSON().id;
      const cashAmountDetails = { refNo, description, type, amount };
      const cashResult = await CashBook.create(cashAmountDetails);
      if (!cashResult) {
        throw new Error("Unable to create cashbook entry for Cash on sale");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  if (amountDetails.paymentType.cheque) {
    try {
      const { paymentType } = amountDetails;
      const type = "CREDIT";
      const description = "CHEQUE";
      const amount = paymentType.cheque;
      const refNo = 'R_' + receive.toJSON().id;
      const chequeAmountDetails = { refNo, description, type, amount };
      const chequeResult = await CashBook.create(chequeAmountDetails);
      if (!chequeResult) {
        throw new Error("Unable to create cashbook entry for Cheque on sale");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  if (amountDetails.paymentType.ecard) {
    try {
      const { paymentType } = amountDetails;
      const type = "CREDIT";
      const description = "E-CARD";
      const amount = paymentType.ecard;
      const refNo = 'R_' + receive.toJSON().id;
      const ecardAmountDetails = { refNo, description, type, amount };
      const ecardResult = await CashBook.create(ecardAmountDetails);
      if (!ecardResult) {
        throw new Error("Unable to create cashbook entry for E-Card on sale");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
};

export const handleItemStatOnReceive = async (itemReceives: any, supplierId: any) => {
  try {
    itemReceives.forEach(
      async (itemReceive: any) => {
        const {
          itemId,
          receivePrice,
          salesPrice,
          quantity,
          description
        } = itemReceive;
        const itemStatDetails = {
          itemId,
          supplierId,
          costPrice: receivePrice,
          salesPrice,
          description,
          quantity,
        };

        const previousItemStatId = await ItemStats.findOne({
          attributes: ["id"],
          where: {
            itemId: itemId,
            costPrice: receivePrice,
          },
        });
        if (previousItemStatId) {
          await ItemStats.update(
            {
              quantity: Sequelize.literal(`quantity + ${quantity}`),
            },
            {
              where: {
                id: previousItemStatId.id,
              },
            }
          );
        } else {
          await ItemStats.create(itemStatDetails);
        }
      }
    );
  } catch (ex) {
    console.log(ex);
  }
};

export const handleSupplierDueOnReceive = async (amountDetails: any, receive: any) => {
  if (amountDetails.paymentType.due) {
    try {
      const { supplierId, dueDate, paymentType } = amountDetails;
      const amount = paymentType.due;
      const description = "SUPPLIER_DUE";
      const total = amount;
      const dueAmountDetails = { receiveId: receive.toJSON().id, supplierId, dueDate, total, amount, description };
      const dueResult = await SupplierDue.create(dueAmountDetails);
      if (!dueResult) {
        throw new Error("Unable to create due entry on receive");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
};
