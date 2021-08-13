import { Router } from "express";
import {
  getCustomer,
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  searchCustomer
} from "../models/Customer";
import { CustomersShape, CustomerShape } from "./apiShapes/Customer";
import {
  CREATE_CUSTOMER_REQUEST_BODY,
  UPDATE_CUSTOMER_REQUEST_BODY
} from "./validators/customer";
import requestValidator from "../middleware/requestValidator";

const customerRoute = Router();

customerRoute.get("/", async (_req, res) => {
  try {
    const customers = await getAllCustomers(_req.query);
    if (!customers.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(customers.map(customer => CustomersShape(customer)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

customerRoute.get("/search/:q", async (req, res) => {
  const { q } = req.params;
  try {
    const customer = await searchCustomer(q);
    if (!customer.length) {
      res.status(204).json([]);
      return;
    }
    res
      .status(200)
      .json(customer);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

customerRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await getCustomer(parseInt(id) || 0);
    if (!customer) res.status(204).json({});
    res.status(200).json(CustomerShape(customer));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

customerRoute.post(
  "/",
  requestValidator({ reqBodyValidator: CREATE_CUSTOMER_REQUEST_BODY }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const customer = await createCustomer(req.body);
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

customerRoute.put("/:id", async (req, res) => {
  requestValidator({ reqBodyValidator: UPDATE_CUSTOMER_REQUEST_BODY });
  const { id } = req.params;
  try {
    const customer = await updateCustomer(parseInt(id), req.body);
    if (!customer) throw new Error("Unable to update the Customer");
    res.status(204).json(customer);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

customerRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await deleteCustomer(parseInt(id));
    if (!customer) throw new Error("Unable to delete the Customer");
    res.status(201).json(customer);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

export default customerRoute;
