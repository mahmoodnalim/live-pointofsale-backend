import { Router } from "express";
import {
  createSale,
  getAllSales,
  getSale,
  handleItemSaleOnSale,
  handleCashBookOnSale,
  handleItemStatOnSale,
  getLastSaleId,
  handleDueOnSale,
} from "../models/Sale";
import { SalesShape, SaleShape } from "./apiShapes/Sale";
import { SALE_ROUTE_REQUEST_BODY } from "./validators/sale";
import requestValidator from "../middleware/requestValidator";

const saleRoute = Router();

saleRoute.get("/", async (req, res) => {
  try {
    const sales = await getAllSales(req.body);
    if (!sales.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(SalesShape(sales));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});
saleRoute.get("/last-sale-id", async (req, res) => {
  try {
    const saleId = await getLastSaleId();

    if (!saleId) {
      res.status(204).json({});
      return;
    }
    res.status(200).json(saleId);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

saleRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await getSale(parseInt(id) || 0);
    if (!sale) res.status(204).json({});
    res.status(200).json(SaleShape(sale));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

saleRoute.post(
  "/",
  requestValidator({ reqBodyValidator: SALE_ROUTE_REQUEST_BODY }),
  async (req, res) => {
    try {
      const { customerId, dueDate, total, paymentType } = req.body;
      const amountDetails = {customerId, dueDate, total, paymentType};
      const sale = await createSale(req.body);
      if (!sale) {
        throw new Error("Unable to create the sale");
      } else {
        res.status(201).json(sale);

        await handleItemSaleOnSale(req.body.itemSales, sale);
        await handleDueOnSale(amountDetails, sale);
        await handleCashBookOnSale(amountDetails, sale);
        await handleItemStatOnSale(req.body.itemSales);
      }
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message,
      });
    }
  }
);

export default saleRoute;
