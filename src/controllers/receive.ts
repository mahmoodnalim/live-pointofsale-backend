import { Router } from 'express';
import { ReceiveShape, ReceivesShape } from './apiShapes/Receive';
import {
  getAllReceivings,
  getReceiving,
  createReceiving,
  handleItemReceiveOnReceive,
  handleCashBookOnReceive,
  handleItemStatOnReceive,
  handleSupplierDueOnReceive,
  findLatestItemReceiveByItemId,
} from '../models/Receive';
import { CREATE_RECEIVE_REQUEST_BODY } from './validators/receive';
import requestValidator from '../middleware/requestValidator';

const receiveRoute = Router();

receiveRoute.get('/', async (req, res) => {
  try {
    const receivings = await getAllReceivings(req.body);
    if (!receivings.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(ReceivesShape(receivings));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

receiveRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const receive = await getReceiving(parseInt(id) || 0);
    if (!receive) res.status(204).json({});
    res.status(200).json(ReceiveShape(receive));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

receiveRoute.get("/latest-item-receive-by-item-id/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const itemReceive = await findLatestItemReceiveByItemId(itemId);

    if (!itemReceive.length) {
      res.status(204).json([]);
      return;
    }

    res.status(200).json(itemReceive);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

receiveRoute.post(
  '/',
  requestValidator({ reqBodyValidator: CREATE_RECEIVE_REQUEST_BODY }),
  async (req, res) => {
    try {
      const receive = await createReceiving(req.body);
      if (!receive) {
        throw new Error('Unable to create the receive');
      } else {
        const { supplierId, dueDate, total, paymentType } = req.body;
        const amountDetails = { supplierId, dueDate, total, paymentType };
        await handleItemReceiveOnReceive(req.body.itemReceives, receive);
        await handleCashBookOnReceive(amountDetails, receive);
        await handleItemStatOnReceive(req.body.itemReceives, supplierId);
        await handleSupplierDueOnReceive(amountDetails, receive);
        res.status(201).json(receive);
      }
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message,
      });
    }
  }
);

export default receiveRoute;
