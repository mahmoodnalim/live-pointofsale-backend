import Sequelize from "sequelize";
import ItemSale from "../db/ItemSale";
import Sale from "../db/Sale";
import Item from "../db/Item";
import ItemStats from "./../db/ItemStat";
import ItemReceiving from "./../db/ItemReceiving";
import Supplier from "./../db/Supplier";
import Receive from "../db/Receive";
import Customer from "../db/Customer";
import Employee from "../db/Employee";

const Op = Sequelize.Op;

export async function getNetProfit(dates: any) {
  const { startDate, endDate } = dates;
  let dateFilters = {};
  if (startDate && endDate) {
    dateFilters = {
      createdAt: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    };
  } else {
    return;
  }

  const allItemSales = await ItemSale.findAll({ where: dateFilters });
  const noOfItems = allItemSales.length;
  return [noOfItems, calculateProfit(allItemSales), startDate, endDate];
}

export async function getDailySales(date: any) {
  let dateFilters = {};
  let salesDate;
  if ("date" in date) {
    dateFilters = {
      createdAt: {
        [Op.lte]: new Date(new Date(date.date).getTime() + 24 * 60 * 60 * 1000),
        [Op.gte]: new Date(date.date),
      },
    };
    salesDate = `Date is ${date.date}`;
  } else {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    };
    salesDate = `Today`;
  }

  const allSales = await Sale.findAll({ where: dateFilters });
  const salesSummary = await Sale.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "salesCount"],
      [Sequelize.fn("SUM", Sequelize.col("total")), "totalOfAllSales"],
    ],
    where: dateFilters,
  });

  return [[...salesSummary], salesDate, [...allSales]];
}

export async function getBestSellingItems(limit: any) {
  let itemLimit;
  if ("limit" in limit) {
    itemLimit = limit.limit;
  } else {
    itemLimit = 10;
  }
  let dateFilters = {
    createdAt: {
      [Op.lt]: new Date(new Date().setDate(31)).setUTCHours(23, 59, 59, 0),
      [Op.gt]: new Date(new Date().setDate(1)).setUTCHours(0, 0, 0, 0),
    },
  };

  const allItemSales = await ItemSale.findAll({
    attributes: [
      "itemId",
      [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalOfQuantity"],
    ],
    where: dateFilters,
    group: "itemId",
    order: [[Sequelize.fn("MAX", Sequelize.col("quantity")), "DESC"]],
    limit: itemLimit,
    include: [
      {
        model: Item,
        as: "item",
        attributes: ["id", "itemName", "barcode"],
      },
    ],
  });
  return allItemSales;
}

export async function getSalesReportByPaymentType(dates: any) {
  const { startDate, endDate } = dates;
  let datePeriod;
  let dateFilters = {};
  if (startDate && endDate) {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(endDate).setUTCHours(23, 59, 59, 0),
        [Op.gt]: new Date(startDate).setUTCHours(0, 0, 0, 0),
      },
    };
    datePeriod = dateFilters;
  } else {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(new Date().setDate(31)).setUTCHours(23, 59, 59, 0),
        [Op.gt]: new Date(new Date().setDate(1)).setUTCHours(0, 0, 0, 0),
      },
    };
    datePeriod = dateFilters;
  }

  const allItemSales = await Sale.findAll({
    attributes: [
      "paymentType",
      [Sequelize.fn("COUNT", Sequelize.col("paymentType")), "Count"],
      [Sequelize.fn("SUM", Sequelize.col("total")), "Amount Tendered"],
    ],
    where: dateFilters,
    group: "paymentType",
    order: [[Sequelize.fn("MAX", Sequelize.col("total")), "DESC"]],
  });
  return allItemSales;
}

export async function getLowInventoryReport() {
  const lowInventories = await ItemStats.findAll({
    attributes: ["itemId", "quantity"],
    include: [
      {
        model: Item,
        as: "item",
        attributes: ["id", "itemName", "reOrderLevel"],
        required: true,
      },
    ],
    where: {
      quantity: { [Op.lt]: Sequelize.literal(`item.reOrderLevel`) },
    },
    order: [["itemId", "ASC"]],
  });

  return lowInventories;
}

export async function getReceivesByDateRange(dates: any) {
  const { startDate, endDate } = dates;
  let dateFilters = {};
  if (startDate && endDate) {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(endDate).setUTCHours(23, 59, 59, 0),
        [Op.gt]: new Date(startDate).setUTCHours(0, 0, 0, 0),
      },
    };
  } else {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(new Date().setDate(31)).setUTCHours(23, 59, 59, 0),
        [Op.gt]: new Date(new Date().setDate(1)).setUTCHours(0, 0, 0, 0),
      },
    };
  }
  const itemReceives = await ItemReceiving.findAll({
    attributes: { exclude: ["discount", "description", "updatedAt"] },
    where: dateFilters,
    include: [
      {
        model: Item,
        as: "item",
        attributes: ["id", "barcode", "itemName"],
      },
      {
        model: Receive,
        as: "receive",
        attributes: ["id", "supplierId"],
        include: [
          {
            model: Supplier,
            as: "supplier",
            attributes: ["firstName", "lastName"],
          },
        ],
      },
    ],
  });
  return itemReceives;
}

export async function getReceivesReportByPaymentType(dates: any) {
  const { startDate, endDate } = dates;
  let datePeriod;
  let dateFilters = {};
  if (startDate && endDate) {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(endDate).setUTCHours(23, 59, 59, 0),
        [Op.gt]: new Date(startDate).setUTCHours(0, 0, 0, 0),
      },
    };
    datePeriod = dateFilters;
  } else {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(new Date().setDate(31)).setUTCHours(23, 59, 59, 0),
        [Op.gt]: new Date(new Date().setDate(1)).setUTCHours(0, 0, 0, 0),
      },
    };
    datePeriod = dateFilters;
  }

  const allItemSales = await Receive.findAll({
    attributes: [
      "paymentType",
      [Sequelize.fn("COUNT", Sequelize.col("paymentType")), "Count"],
      [Sequelize.fn("SUM", Sequelize.col("total")), "Amount Tendered"],
    ],
    where: dateFilters,
    group: "paymentType",
    order: [[Sequelize.fn("MAX", Sequelize.col("total")), "DESC"]],
  });
  return allItemSales;
}

export async function getTotalCountOfEntries(){
  const sales = await Sale.findOne({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "SalesCount"]]
  });
  const items = await Item.findOne({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "ItemsCount"]]
  });
  const customers = await Customer.findOne({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "CustomersCount"]]
  });
  const suppliers = await Supplier.findOne({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "SuppliersCount"]]
  });
  const employees = await Employee.findOne({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "EmployeesCount"]]
  });
  return {sales, items, customers, suppliers, employees};
}

export async function getBestProfitGivenCustomer(dates: any) {
  const { startDate, endDate } = dates;
  let dateFilters = {};
  if (startDate && endDate) {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(endDate).setUTCHours(23, 59, 59, 0),
        [Op.gt]: new Date(startDate).setUTCHours(0, 0, 0, 0),
      },
    };
  } else {
    dateFilters = {
      createdAt: {
        [Op.lt]: new Date(new Date().setDate(31)).setUTCHours(23, 59, 59, 0),
        [Op.gt]: new Date(new Date().setDate(1)).setUTCHours(0, 0, 0, 0),
      },
    };
  }
  const bestProfitGivingCustomers = await Sale.findAll({
    attributes: ["customerId"],
    where: dateFilters,
    include: [
      {
        model: ItemSale,
        as: "itemSales",
        attributes: [
          [Sequelize.fn("SUM", Sequelize.literal(`sellingPrice * quantity`)), "Total"], 
          [Sequelize.fn("SUM", Sequelize.literal(`costPrice * quantity`)), "Total cost"],
          [Sequelize.fn("SUM", Sequelize.literal(`(sellingPrice - costPrice) * quantity`)), "Profit"]
        ],
        where:{saleId:Sequelize.literal(`Sale.id`)}
      },
      {
        model: Customer,
        as: "customer",
        attributes: ["firstName", "lastName"]
      },
    ],
    group:"customerId",
    order: Sequelize.literal(`(sellingPrice - costPrice) * quantity DESC`)
  });
  return {bestProfitGivingCustomers};
}

function calculateProfit(a: any) {
  let sum = 0;
  for (let index = 0; index < a.length; index++) {
    const element = a[index];
    let p = element.quantity;
    let q = element.sellingPrice;
    let r = element.costPrice;
    sum += p * (q - r);
  }
  return sum;
}
