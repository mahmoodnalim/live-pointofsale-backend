import { Router } from "express";
import { ItemShape, ItemsShape, ItemDetailsShape, ItemDetailsByItemStatIdShape } from "./apiShapes/Item";
import {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  searchItem,
  searchItemsForReceives,
  getItemDetails,
  getAllItemDetails,
  getAllItemDetailsByItemStatId,
  getStockPerItemDetails,
} from "../models/Item";
import {
  CREATE_ITEM_REQUEST_BODY,
  UPDATE_ITEM_REQUEST_BODY,
} from "./validators/item";
import requestValidator from "../middleware/requestValidator";
import {
  ItemSearchShape,
} from "./apiShapes/ItemStat";
import { StockPerItemShape } from "./apiShapes/StockPerItem";

const itemRoute = Router();

itemRoute.get("/", async (_req, res) => {
  try {
    const items = await getAllItems();
    if (!items.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(items.map((item) => ItemsShape(item)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

itemRoute.get("/search/:q", async (req, res) => {
  const { q } = req.params;
  try {
    const itemStats = await searchItem(q);
    if (!itemStats.length) {
      res.status(204).json([]);
      return;
    }
    res
      .status(200)
      .json(itemStats.map((itemStat) => ItemSearchShape(itemStat)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

itemRoute.get("/item-search/:q", async (req, res) => {
  const { q } = req.params;
  try {
    const items = await searchItemsForReceives(q);
    if (!items.length) {
      res.status(204).json([]);
      return;
    }
    res
      .status(200)
      .json(items);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

itemRoute.get("/item-details", async (_req, res) => {
  try {
    const itemDetails = await getItemDetails();
    if (!itemDetails.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(itemDetails.map((item) => ItemsShape(item)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

itemRoute.get("/item-details-search", async (req, res) => {
  try {
    let itemDetails: any;
    if (req.query.itemStatId) {
      itemDetails = await getAllItemDetailsByItemStatId(req.query.itemStatId)
      console.log(itemDetails)
      itemDetails = ItemDetailsByItemStatIdShape(itemDetails)
      itemDetails = itemDetails ? [itemDetails] : []
      if (!itemDetails.length) {
        res.status(204).json([]);
        return;
      }
    } else {
      itemDetails = await getAllItemDetails(req.query);
      itemDetails = itemDetails.map((details: any) => ItemDetailsShape(details))
      if (!itemDetails.length) {
        res.status(204).json([]);
        return;
      }
    }
    res.status(200).json(itemDetails);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

itemRoute.get("/stock-per-item", async (req, res) => {
  try {
    let stockPerItem: any;
    stockPerItem = await getStockPerItemDetails(req.query.searchWord)
    stockPerItem = stockPerItem.map((details: any) => StockPerItemShape(details));

    if (!stockPerItem.length) {
      res.status(204).json([]);
      return;
    }

    res.status(200).json(stockPerItem);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

itemRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await getItem(parseInt(id) || 0);
    if (!item) res.status(204).json({});
    res.status(200).json(ItemShape(item));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

itemRoute.post(
  "/",
  requestValidator({ reqBodyValidator: CREATE_ITEM_REQUEST_BODY }),
  async (req, res) => {
    try {
      const item = await createItem(req.body);
      if (!item) throw new Error("Unable to create the item");
      res.status(201).json(item);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message,
      });
    }
  }
);

itemRoute.put("/:id", async (req, res) => {
  requestValidator({ reqBodyValidator: UPDATE_ITEM_REQUEST_BODY });
  const { id } = req.params;
  try {
    const item = await updateItem(parseInt(id), req.body);
    if (!item) throw new Error("Unable to update the item");
    res.status(201).json(item);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

itemRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await deleteItem(parseInt(id));
    if (!item) throw new Error("Unable to delete the item");
    res.status(201).json(item);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

export default itemRoute;
