import { Router } from "express";
import { CashbookShape } from "./apiShapes/CashBook";
import {
   getAllCashBookEntries,
  getCashBookEntry,
  createCashbookEntry,
  handleDueOnCashbook,
  handleSupplierDueOnCashbook
} from "../models/Cashbook";
import { CREATE_CAHSBOOK_REQUEST_BODY } from "./validators/cashBook";
import requestValidator from "../middleware/requestValidator";

const cashBookRoute = Router();

cashBookRoute.get("/", async (_req, res) => {
  try {
    const entries = await getAllCashBookEntries(_req.query);
    if (!entries.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(entries.map((entry: any) => CashbookShape(entry)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

cashBookRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await getCashBookEntry(parseInt(id) || 0);
    if (!entry) res.status(204).json({});
    res.status(200).json(CashbookShape(entry));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

cashBookRoute.post(
  "/receive-due-from-customers",
  requestValidator({ reqBodyValidator: CREATE_CAHSBOOK_REQUEST_BODY }),
  async (req, res) => {
    try {
      const { refNo, type, amount, description, dueId } = req.body;
      const dueDetails = {refNo, type, amount, description, dueId };
      const entry = await createCashbookEntry(req.body);
      if (!entry) throw new Error("Unable to create receive due from customers cashbook entry");
      res.status(201).json(entry);

      await handleDueOnCashbook(dueDetails);
      
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  }
);

cashBookRoute.post(
  "/pay-due-to-suppliers",
  requestValidator({ reqBodyValidator: CREATE_CAHSBOOK_REQUEST_BODY }),
  async (req, res) => {
    try {
      const { refNo, type, amount, description, dueId } = req.body;
      const dueDetails = {refNo, type, amount, description, dueId };
      const entry = await createCashbookEntry(req.body);
      if (!entry) throw new Error("Unable to create pay dues to suppliers cashbook entry");
      res.status(201).json(entry);

      await handleSupplierDueOnCashbook(dueDetails);
      
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  }
);

export default cashBookRoute;
