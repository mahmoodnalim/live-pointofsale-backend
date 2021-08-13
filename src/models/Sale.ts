import ISale from "../interfaces/ISale";
import Sale from "../db/Sale";
import Customer from "../db/Customer";
import ItemSale from "../db/ItemSale";
import Sequelize from "sequelize";
import Item from "../db/Item";
import CashBook from "../db/CashBook";
import ItemStats from "../db/ItemStat";
import Due from "../db/Due";

const Op = Sequelize.Op;

const getSaleOptions = {
  include: [
    {
      model: Customer,
      as: "customer",
      attributes: ["firstName", "lastName"],
    },
    {
      model: ItemSale,
      as: "itemSales",
      attributes: ["discount", "quantity", "sellingPrice", "itemId"],
      include: [
        {
          model: Item,
          as: "item",
          attributes: ["itemName"],
        },
      ],
    },
  ],
  attributes: ["total", "totalDiscount"],
};

export async function getAllSales(dates: any) {
  const { date1, date2 } = dates;
  let date = "";
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

  const allSales = await Sale.findAll({ where: dateFilters });
  const salesSummary = await Sale.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "salesCount"],
      [Sequelize.fn("SUM", Sequelize.col("total")), "totalOfAllSales"],
    ],
  });
  return [[...salesSummary], date, [...allSales]];
}

export async function getSale(id: number) {
  return await Sale.findByPk(id, getSaleOptions);
}

export async function createSale(sale: ISale) {
  return await Sale.create(sale);
}

export async function getLastSaleId() {
  const id = await Sale.findOne({
    attributes: [[Sequelize.fn("MAX", Sequelize.col("id")), "LastSaleId"]],
  });
  return id;
}

export const handleItemSaleOnSale = async (itemSales: any, sale: any) => {
  itemSales.forEach(async (itemSale: any) => {
    try {
      const {
        itemId,
        sellingPrice,
        discount,
        quantity,
        description,
      } = itemSale;
      const costPrice = await ItemStats.findOne({attributes:["costPrice"], where:{ItemId:itemSale.itemId}});
      const itemSaleDetails = {
        saleId: sale.toJSON().id,
        itemId,
        costPrice:costPrice?.costPrice,
        sellingPrice,
        discount,
        quantity,
        description,
      };
      const itemSaleResult = await ItemSale.create(itemSaleDetails);
      if (!itemSaleResult) {
        throw new Error("Unable to create the  item sale");
      }
    } catch (ex) {
      console.log(ex);
    }
  });
};

export const handleDueOnSale = async (amountDetails: any, sale: any) => {
  if (amountDetails.paymentType.due) {
    try {
      const { customerId, dueDate, paymentType } = amountDetails;
      const amount = paymentType.due;
      const description = "CUSTOMER_DUE";
      const total = amount;
      const dueAmountDetails = {saleId: sale.toJSON().id, customerId, dueDate, total, amount, description};
      const dueResult = await Due.create(dueAmountDetails);
      if (!dueResult) {
        throw new Error("Unable to create due entry on sale");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
};

export const handleCashBookOnSale = async (amountDetails: any, sale: any) => {
  if (amountDetails.paymentType.cash) {
    try {
      const { paymentType } = amountDetails;
      const type = "DEBIT";
      const description = "CASH";
      const amount = paymentType.cash;
      const refNo = 'S_'+sale.toJSON().id;
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
      const type = "DEBIT";
      const description = "CHEQUE";
      const amount = paymentType.cheque;
      const refNo = 'S_' +sale.toJSON().id;
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
      const type = "DEBIT";
      const description = "E-CARD";
      const amount = paymentType.ecard;
      const refNo = 'S_' + sale.toJSON().id;
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

export const handleItemStatOnSale = async (itemSales: any) => {
  try {
    itemSales.forEach(
      async (itemSale: { quantity: number; itemId: number; itemStatId: number }) => {
        await ItemStats.update(
          {
            quantity: Sequelize.literal(`quantity - ${itemSale.quantity}`),
          },
          {
            where: {
              id: itemSale.itemStatId,
            },
          }
        );
      }
    );
  } catch (ex) {
    console.log(ex);
  }
};
