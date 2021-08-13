import { Router } from "express";
import {
  getItemStats,
  createItemStats,
  getAllItemStats,
  deleteItemStat,
  getTotalStockValue,
} from "../models/ItemStat";
import { ItemStatsShape, ItemStatShape } from "./apiShapes/ItemStat";
import { CREATE_ITEM_STAT_REQUEST_BODY } from "./validators/itemStat";
import requestValidator from "../middleware/requestValidator";

const itemStatRoute = Router();

itemStatRoute.get("/", async (_req, res) => {
  try {
    const itemStats = await getAllItemStats();
    if (!itemStats.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(itemStats.map(itemStat => ItemStatsShape(itemStat)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

itemStatRoute.get("/total-stock-value", async (_req, res) => {
  try {
    const totalStockValue = await getTotalStockValue();
    res.status(200).json(totalStockValue[0]);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

itemStatRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const itemStat = await getItemStats(parseInt(id) || 0);
    if (!itemStat) res.status(204).json({});
    res.status(200).json(ItemStatShape(itemStat));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

itemStatRoute.post(
  "/",
  requestValidator({ reqBodyValidator: CREATE_ITEM_STAT_REQUEST_BODY }),
  async (req, res) => {
    try {
      const itemStat = await createItemStats(req.body);
      if (!itemStat) throw new Error("Unable to create the itemStat");
      res.status(201).json(itemStat);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  }
);

itemStatRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await deleteItemStat(parseInt(id));
    if (!item) throw new Error("Unable to delete the item stat");
    res.status(201).json(item);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

export default itemStatRoute;
