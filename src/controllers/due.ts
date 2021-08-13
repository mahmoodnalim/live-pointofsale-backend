import { Router } from 'express';
import {
  getAllDues,
  createDue,
  getDue,
  updateDue,
  deleteDue,
  getAllDuesByCustomerId
} from '../models/Due';
import {
  CREATE_DUE_REQUEST_BODY,
  UPDATE_DUE_REQUEST_BODY
} from './validators/due';
import requestValidator from '../middleware/requestValidator';

const dueRoute = Router();

dueRoute.get('/', async (_req, res) => {
  try {
    const dues = await getAllDues();
    if (!dues.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(dues);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

dueRoute.get('/search-by-customer-id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dues = await getAllDuesByCustomerId(parseInt(id) || 0);
    if (!dues.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(dues);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

dueRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const due = await getDue(parseInt(id) || 0);
    if (!due) res.status(204).json({});
    res.status(200).json(due);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

dueRoute.post(
  '/',
  requestValidator({ reqBodyValidator: CREATE_DUE_REQUEST_BODY }),
  async (req, res) => {
    try {
      const due = await createDue(req.body);
      if (!due) throw new Error('Unable to create the Due');
      res.status(201).json(due);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  }
);

dueRoute.put('/:id', async (req, res) => {
  requestValidator({ reqBodyValidator: UPDATE_DUE_REQUEST_BODY });
  const { id } = req.params;
  try {
    const due = await updateDue(parseInt(id), req.body);
    if (!due) throw new Error('Unable to update the Due');
    res.status(201).json(due);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

dueRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const due = await deleteDue(parseInt(id));
    if (!due) throw new Error('Unable to delete the Due');
    res.status(201).json(due);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

export default dueRoute;
