import { Router } from "express";
import {
    getItemReceiving,
    createItemReceiving,
    getAllItemReceivings,
} from "../models/ItemReceiving";
import { ItemReceivingsShapes, ItemReceivingShape } from "./apiShapes/ItemReceiving";
import { CREATE_ITEM_RECEIVING_REQUEST_BODY } from "./validators/itemReceiving";
import requestValidator from "../middleware/requestValidator";

const itemReceivingRoute = Router();

itemReceivingRoute.get("/", async (req, res) => {
    try {
        const itemReceivings = await getAllItemReceivings();
        if (!itemReceivings.length) {
            res.status(204).json([]);
            return;
        }
        res.status(200).json(itemReceivings.map(itemReceiving => ItemReceivingsShapes(itemReceiving)));
    } catch (ex) {
        console.log(ex);
        res.status(res.statusCode || 400).json({
            error: ex.message
        });
    }
});

itemReceivingRoute.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const itemReceiving = await getItemReceiving(parseInt(id) || 0);
        if (!itemReceiving) res.status(204).json({});
        res.status(200).json(ItemReceivingShape(itemReceiving));
    } catch (ex) {
        console.log(ex);
        res.status(res.statusCode || 400).json({
            error: ex.message
        });
    }
});

itemReceivingRoute.post(
    "/",
    requestValidator({ reqBodyValidator: CREATE_ITEM_RECEIVING_REQUEST_BODY }),
    async (req, res) => {
        try {
            const itemReceiving = await createItemReceiving(req.body);
            if (!itemReceiving) throw new Error("Unable to create the Customer");
            res.status(201).json(itemReceiving);
        } catch (ex) {
            console.log(ex);
            res.status(res.statusCode || 400).json({
                error: ex.message
            });
        }
    }
);

export default itemReceivingRoute;
