import { Router } from 'express';
import {
  getSupplier,
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
  searchSupplier
} from '../models/Supplier';
import { SuppliersShape, SupplierShape } from './apiShapes/Supplier';
import {
  CREATE_SUPPLIER_REQUEST_BODY,
  UPDATE_SUPPLIER_REQUEST_BODY
} from './validators/supplier';
import requestValidator from '../middleware/requestValidator';

const supplierRoute = Router();

supplierRoute.get('/', async (_req, res) => {
  try {
    const suppliers = await getAllSuppliers();
    if (!suppliers.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(suppliers.map(supplier => SuppliersShape(supplier)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

supplierRoute.get("/search/:q", async (req, res) => {
  const { q } = req.params;
  try {
    const supplier = await searchSupplier(q);
    if (!supplier.length) {
      res.status(204).json([]);
      return;
    }
    res
      .status(200)
      .json(supplier);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

supplierRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await getSupplier(parseInt(id) || 0);
    if (!supplier) res.status(204).json({});
    res.status(200).json(SupplierShape(supplier));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

supplierRoute.post(
  '/',
  requestValidator({ reqBodyValidator: CREATE_SUPPLIER_REQUEST_BODY }),
  async (req, res) => {
    try {
      const supplier = await createSupplier(req.body);
      if (!supplier) throw new Error('Unable to create the Supplier');
      res.status(201).json(supplier);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  }
);

supplierRoute.put('/:id', async (req, res) => {
  requestValidator({ reqBodyValidator: UPDATE_SUPPLIER_REQUEST_BODY });
  const { id } = req.params;
  try {
    const supplier = await updateSupplier(parseInt(id), req.body);
    if (!supplier) throw new Error('Unable to update the Supplier');
    res.status(201).json(supplier);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

supplierRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await deleteSupplier(parseInt(id));
    if (!supplier) throw new Error('Unable to delete the Supplier');
    res.status(201).json(supplier);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

export default supplierRoute;
