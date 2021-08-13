import ItemStats from "../db/ItemStat";
import IItemStats from "../interfaces/IItemStat";
import Supplier from "../db/Supplier";
import Item from "../db/Item";
import Sequelize from 'sequelize';

const getItemStatsOptions = {
  include: [
    {
      model: Supplier,
      as: 'supplier'
    },
    {
      model: Item,
      as: 'item'
    }
  ]
};

export async function getAllItemStats() {
  return await ItemStats.findAll();
}

export async function getTotalStockValue() {
  return await ItemStats.findAll(
    {
      attributes: [
        [Sequelize.fn('Sum',
          Sequelize.literal(`quantity * costPrice`)
        ), 'totalStockValue']
      ]
    }
  )
}

export async function getItemStats(id: number, ) {
  return await ItemStats.findByPk(id, getItemStatsOptions);
}

export async function createItemStats(iemStat: IItemStats) {
  return await ItemStats.create(iemStat);
}

export async function deleteItemStat(id: number) {
  const itemStat = await ItemStats.findByPk(id);
  if (itemStat) {
    await itemStat.destroy();
    return itemStat;
  }
}

