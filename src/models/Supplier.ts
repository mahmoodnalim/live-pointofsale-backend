import ISupplier from "../interfaces/ISupplier";
import Supplier from "../db/Supplier";
import ItemStats from "../db/ItemStat";
import Receive from "../db/Receive";
import { Op } from "sequelize";

const getSupplierOptions = {
  include: [
    {
      model: ItemStats,
      as: "itemStats",
    },
    {
      model: Receive,
      as: "receivings",
    },
  ],
};

export async function getAllSuppliers() {
  return await Supplier.findAll();
}

export async function getSupplier(id: number) {
  return await Supplier.findByPk(id, getSupplierOptions);
}

export async function createSupplier(supplier: ISupplier) {
  return await Supplier.create(supplier);
}

export async function updateSupplier(id: number, supplier: any) {
  const oldSupplier = await Supplier.findByPk(id);
  if (oldSupplier) {
    const newSupplier = await oldSupplier.update(supplier);
    return newSupplier;
  }
}

export async function deleteSupplier(id: number) {
  const oldSupplier = await Supplier.findByPk(id);
  const itemStatsOfSupplier = await ItemStats.findOne({
    where: { supplierId: id },
  });
  const receivesOfSupplier = await Receive.findOne({
    where: { supplierId: id },
  });
  if (itemStatsOfSupplier == null && receivesOfSupplier == null) {
    if (oldSupplier) {
      await oldSupplier.destroy();
      return oldSupplier;
    }
  }
}

export async function searchSupplier(q: any) {
  const supplierId = await Supplier.findAll({
    attributes: ["id"],
    where: {
      [Op.or]: [
        { id: { [Op.like]: `%${q}%` } },
        { firstName: { [Op.like]: `%${q}%` } },
        { companyName: { [Op.like]: `%${q}%` } },
      ],
    },
  });
  const i_id = supplierId.map((tag) => tag.id);
  const supplier = await Supplier.findAll({
    attributes: ["id", "firstName", "lastName", "companyName", "phoneNo"],
    where: { id: i_id },
    
  });
  return supplier;
}
