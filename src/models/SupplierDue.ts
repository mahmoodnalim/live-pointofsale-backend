import { Op } from "sequelize";
import SupplierDue from "../db/SupplierDue";
import ISupplierDue from "../interfaces/ISupplierDue";

export async function getAllSupplierDues() {
  return await SupplierDue.findAll();
}

export async function getSupplierDue(id: number) {
  return await SupplierDue.findByPk(id);
}

export async function createSupplierDue(supplierDue: ISupplierDue) {
  return await SupplierDue.create(supplierDue);
}

export async function updateSupplierDue(id: number, supplierDue: any) {
  const oldSupplierDue = await SupplierDue.findByPk(id);
  if (oldSupplierDue) {
    const newSupplierDue = await oldSupplierDue.update(supplierDue);
    return newSupplierDue;
  }
}

export async function deleteSupplierDue(id: number) {
  const oldSupplierDue = await SupplierDue.findByPk(id);
  if (oldSupplierDue) {
    await oldSupplierDue.destroy();
    return oldSupplierDue;
  }
}

export async function getAllDuesBySupplierId(id: number) {
  const supplierDues = await SupplierDue.findAll({
    where: {supplierId: id}
  });
  return supplierDues;
}