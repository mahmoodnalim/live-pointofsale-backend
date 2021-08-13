import { Router } from 'express';
import {
  getAllSupplierDues,
  createSupplierDue,
  getSupplierDue,
  updateSupplierDue,
  deleteSupplierDue,
  getAllDuesBySupplierId
} from '../models/SupplierDue';
import {
  CREATE_SUPPLIER_DUE_REQUEST_BODY,
  UPDATE_SUPPLIER_DUE_REQUEST_BODY
} from './validators/supplierDue';
import requestValidator from '../middleware/requestValidator';

const supplierDueRoute = Router();

supplierDueRoute.get('/', async (_req, res) => {
  try {
    const supplierDues = await getAllSupplierDues();
    if (!supplierDues.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(supplierDues);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

supplierDueRoute.get('/search-by-supplier-id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const supplierDues = await getAllDuesBySupplierId(parseInt(id) || 0);
    if (!supplierDues.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(supplierDues);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

supplierDueRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const supplierDue = await getSupplierDue(parseInt(id) || 0);
    if (!supplierDue) res.status(204).json({});
    res.status(200).json(supplierDue);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

supplierDueRoute.post(
  '/',
  requestValidator({ reqBodyValidator: CREATE_SUPPLIER_DUE_REQUEST_BODY }),
  async (req, res) => {
    try {
      const supplierDue = await createSupplierDue(req.body);
      if (!supplierDue) throw new Error('Unable to create the supplier Due');
      res.status(201).json(supplierDue);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  }
);

supplierDueRoute.put('/:id', async (req, res) => {
  requestValidator({ reqBodyValidator: UPDATE_SUPPLIER_DUE_REQUEST_BODY });
  const { id } = req.params;
  try {
    const supplierDue = await updateSupplierDue(parseInt(id), req.body);
    if (!supplierDue) throw new Error('Unable to update the supplier Due');
    res.status(201).json(supplierDue);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

supplierDueRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const supplierDue = await deleteSupplierDue(parseInt(id));
    if (!supplierDue) throw new Error('Unable to delete the supplier Due');
    res.status(201).json(supplierDue);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

export default supplierDueRoute;
