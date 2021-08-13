import { Router } from "express";
import {
    getItemSales,
    createItemSale,
    getAllItemSales,
} from "../models/ItemSale";
import { ItemSaleShape, ItemSalesShape } from "./apiShapes/ItemSale";
import {   CREATE_ITEM_SALE_REQUEST_BODY } from "./validators/itemSale";
import requestValidator from "../middleware/requestValidator";

const itemSaleRoute = Router();

itemSaleRoute.get("/", async (_req, res) => {
    try {
        const itemSales = await getAllItemSales();
        if (!itemSales.length) {
            res.status(204).json([]);
            return;
        }
        res.status(200).json(itemSales.map(itemSale => ItemSalesShape(itemSale)));
    } catch (ex) {
        console.log(ex);
        res.status(res.statusCode || 400).json({
            error: ex.message
        });
    }
});

itemSaleRoute.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const itemSale = await getItemSales(parseInt(id) || 0);
        if (!itemSale) res.status(204).json({});
        res.status(200).json(ItemSaleShape(itemSale));
    } catch (ex) {
        console.log(ex);
        res.status(res.statusCode || 400).json({
            error: ex.message
        });
    }
});

itemSaleRoute.post(
    "/",
    requestValidator({ reqBodyValidator: CREATE_ITEM_SALE_REQUEST_BODY }),
    async (req, res) => {
        const { id } = req.params;
        try {
            const customer = await createItemSale(req.body);
            if (!customer) throw new Error("Unable to create the Customer");
            res.status(201).json(customer);
        } catch (ex) {
            console.log(ex);
            res.status(res.statusCode || 400).json({
                error: ex.message
            });
        }
    }
);

export default itemSaleRoute;
