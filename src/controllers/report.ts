import { Router } from "express";
import {
  getNetProfit,
  getDailySales,
  getBestSellingItems,
  getSalesReportByPaymentType,
  getLowInventoryReport,
  getReceivesByDateRange,
  getReceivesReportByPaymentType,
  getTotalCountOfEntries,
  getBestProfitGivenCustomer
} from "../models/Report";
import { SalesShape, TotalCountShape } from "./apiShapes/Report";

const reportRoute = Router();

reportRoute.get("/", async (req, res) => {
  try {
    const profitForPeriod = await getNetProfit(req.query);

    if (!profitForPeriod) {
      res.status(204).json({});
      return;
    }
    res.status(200).json({
      noOfItemSales: profitForPeriod[0],
      netProfit: profitForPeriod[1],
      startDate: profitForPeriod[2],
      endDate: profitForPeriod[3],
    });
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

reportRoute.get("/dailySales", async (req, res) => {
  try {
    const dailySales = await getDailySales(req.query);

    if (!dailySales) {
      res.status(204).json({});
      return;
    }
    res.status(200).json(SalesShape(dailySales));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

reportRoute.get("/best-selling-items", async (req, res) => {
  try {
    const items = await getBestSellingItems(req.query);

    if (!items) {
      res.status(204).json({});
      return;
    }
    res.status(200).json(items);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

reportRoute.get("/report-by-payment-type", async (req, res) => {
  try {
    const salesByPaymentType = await getSalesReportByPaymentType(req.query);

    if (!salesByPaymentType) {
      res.status(204).json({});
      return;
    }
    res.status(200).json(salesByPaymentType);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

reportRoute.get("/low-inventory-report", async (req, res) => {
  try {
    const lowInventories = await getLowInventoryReport();

    if (!lowInventories) {
      res.status(204).json({});
      return;
    }
    res.status(200).json(lowInventories);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

reportRoute.get("/receives-by-date-range", async (req, res) => {
  try {
    const receivesByDate = await getReceivesByDateRange(req.query);

    if (!receivesByDate) {
      res.status(204).json({});
      return;
    }
    res.status(200).json(receivesByDate);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

reportRoute.get("/receives-report-by-payment-type", async (req, res) => {
  try {
    const receivesByPaymentType = await getReceivesReportByPaymentType(req.query);

    if (!receivesByPaymentType) {
      res.status(204).json({});
      return;
    }
    res.status(200).json(receivesByPaymentType);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

reportRoute.get("/total-count-of-entries", async (req, res) => {
  try {
    const totalCountOfEntries = await getTotalCountOfEntries();

    if (!totalCountOfEntries) {
      res.status(204).json({});
      return;
    }
    res.status(200).json(TotalCountShape(totalCountOfEntries));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});
reportRoute.get("/best-profit-given-customers", async (req, res) => {
  try {
    const sales = await getBestProfitGivenCustomer(req.query);

    if (!sales) {
      res.status(204).json({});
      return;
    }
    res.status(200).json(sales);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

export default reportRoute;
