import { Router } from "express";
import {
  getEmployee,
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} from "../models/Employee";
import { EmployeeShape, EmployeesShape } from "./apiShapes/Employee";
import {
  CREATE_EMPLOYEE_REQUEST_BODY,
  UPDATE_EMPLOYEE_REQUEST_BODY
} from "./validators/employee";
import requestValidator from "../middleware/requestValidator";
import validateJwt from "../middleware/validateJwt";

const employeeRoute = Router();

employeeRoute.get("/", async (_req, res) => {
  try {
    const employees = await getAllEmployees();
    if (!employees.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(employees.map(employee => EmployeesShape(employee)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

employeeRoute.get("/:id", validateJwt, async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await getEmployee(parseInt(id) || 0);
    if (!employee) res.status(204).json({});
    res.status(200).json(EmployeeShape(employee));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

employeeRoute.post(
  "/",
  validateJwt,
  requestValidator({ reqBodyValidator: CREATE_EMPLOYEE_REQUEST_BODY }),
  async (req, res) => {
    try {
      const employee = await createEmployee(req.body);
      if (!employee) throw new Error("Unable to create the Employee");
      res.status(201).json(employee);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  }
);

employeeRoute.put("/:id",
  validateJwt,
  requestValidator({ reqBodyValidator: UPDATE_EMPLOYEE_REQUEST_BODY }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const employee = await updateEmployee(parseInt(id), req.body);
      if (!employee) throw new Error("Unable to update the Employee");
      res.status(201).json(employee);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  });

employeeRoute.delete("/:id",
  validateJwt,
  async (req, res) => {
    const { id } = req.params;
    try {
      const employee = await deleteEmployee(parseInt(id));
      if (!employee) throw new Error("Unable to delete the Employee");
      res.status(201).json(employee);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  });

export default employeeRoute;
