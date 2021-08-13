import { Op } from "sequelize";
import Due from "../db/Due";
import IDue from "../interfaces/IDue";

export async function getAllDues() {
  return await Due.findAll();
}

export async function getDue(id: number) {
  return await Due.findByPk(id);
}

export async function createDue(due: IDue) {
  return await Due.create(due);
}

export async function updateDue(id: number, due: any) {
  const oldDue = await Due.findByPk(id);
  if (oldDue) {
    const newDue = await oldDue.update(due);
    return newDue;
  }
}

export async function deleteDue(id: number) {
  const oldDue = await Due.findByPk(id);
  if (oldDue) {
    await oldDue.destroy();
    return oldDue;
  }
}

export async function getAllDuesByCustomerId(id: number) {
  const dues = await Due.findAll({
    where: {customerId: id}
  });
  return dues;
}