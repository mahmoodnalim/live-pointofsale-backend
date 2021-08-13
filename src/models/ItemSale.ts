import ItemSale from "./../db/ItemSale";
import IItemSale from "./../interfaces/IItemSale";
import Item from "../db/Item";
import Sale from "../db/Sale";

const getItemSalesOptions = {
  include: [
    {
      model: Item,
      as: 'item'
    },
    {
      model: Sale,
      as: 'sale'
    }
  ]
}

export async function getAllItemSales() {
  return await ItemSale.findAll();
}

export async function getItemSales(id: number) {
  return await ItemSale.findByPk(id, getItemSalesOptions);
}

export async function createItemSale(item: any) {
  return await ItemSale.create(item);
}