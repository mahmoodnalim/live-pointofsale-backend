import Item from "./../db/Item";
import IItem from "./../interfaces/IItem";
import ItemStats from "../db/ItemStat";
import { Op } from "sequelize";
import Supplier from "../db/Supplier";
import Sequelize from 'sequelize';

const getItemOptions = {
  include: [
    {
      model: ItemStats,
      as: "itemStats",
    },
  ],
};

export async function getAllItems() {
  return await Item.findAll({
    attributes: ["id", "barcode", "itemCode", "itemName", "stockNumber", "itemType"],
    include: [{
      model: ItemStats,
      as: "itemStats",
      attributes: ["itemId", "supplierId"],
      include: [{
        model: Supplier,
        as: "supplier",
        attributes: ["companyName"]
      }]
    }],
  });
}

export async function getItem(id: number) {
  return await Item.findByPk(id, getItemOptions);
}

export async function createItem(item: IItem) {
  return await Item.create(item);
}

export async function updateItem(id: number, item: any) {
  const oldItem = await Item.findByPk(id);
  if (oldItem) {
    const newItem = await oldItem.update(item);
    return newItem;
  }
}

export async function deleteItem(id: number) {
  const oldItem = await Item.findByPk(id);
  if (oldItem) {
    await oldItem.destroy();
    return oldItem;
  }
}

export async function searchItem(q: any) {
  const itemAtt = await Item.findAll({
    attributes: ["id"],
    where: {
      [Op.or]: [
        { id: { [Op.like]: `%${q}%` } },
        { barcode: { [Op.like]: `%${q}%` } },
        { itemName: { [Op.like]: `%${q}%` } },
        { itemCode: { [Op.like]: `%${q}%` } },
      ],
    },
  });
  const i_id = itemAtt.map((tag) => tag.id);
  const ItemStatsAtt = await ItemStats.findAll({
    attributes: ["id", "costPrice", "salesPrice", "quantity", "createdAt"],
    where: { itemId: i_id },
    include: [
      {
        model: Item,
        as: "item",
        attributes: ["id", "itemName", "itemCode", "category"],
        include: [{
          model: Supplier,
          as: "supplier",
        }]
      },
    ],
  });
  return ItemStatsAtt;
}

export async function searchItemsForReceives(q: any) {
  const itemId = await Item.findAll({
    attributes: ["id"],
    where: {
      [Op.or]: [
        { id: { [Op.like]: `%${q}%` } },
        { barcode: { [Op.like]: `%${q}%` } },
        { itemName: { [Op.like]: `%${q}%` } },
        { itemCode: { [Op.like]: `%${q}%` } },
      ],
    },
  });
  const i_id = itemId.map((tag) => tag.id);
  const items = await Item.findAll({
    attributes: ["id", "itemName", "itemCode"],
    where: { id: i_id },
    include: [
      {
        model: Supplier,
        attributes: ["companyName"]
      },
    ]

  });
  return items;
}

export async function getItemDetails() {
  return await Item.findAll({
    attributes: ["id", "barcode", "itemCode", "itemName", "stockNumber", "itemType", "createdAt"],
    include: [{
      model: ItemStats,
      as: "itemStats",
      attributes: ["costPrice", "salesPrice", "quantity"],
    },
    {
      model: Supplier,
      as: "supplier",
      attributes: ["id", "firstName", "lastName", "companyName"]
    }],
    group: [`itemStats.costPrice`],
    order: ["id"]
  });
}

export async function getStockPerItemDetails(searchWord: any) {
  return await Item.findAll({
    attributes: ["id", "itemCode", "itemName", 'reOrderLevel'],
    where: searchWord ? {
      [Op.or]: [
        { itemCode: { [Op.like]: `%${searchWord}%` } },
        { itemName: { [Op.like]: `%${searchWord}%` } },
      ]
    } : {},
    include: [
      {
        model: ItemStats,
        as: "itemStats",
        attributes: [[Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQty']],
      },
      {
        model: Supplier,
        as: "supplier",
        attributes: ["companyName"]
      }
    ],
    group: ['itemStats.itemId']
  });
}

const allItemDetailsAttributes = {
  item: ["id", "barcode", "itemCode", "itemName", "category", "itemType", "brandId", 'reOrderLevel'],
  itemStats: ["costPrice", "salesPrice", "quantity", "createdAt", "id"],
  supplier: ["id", "companyName"]
}

export async function getAllItemDetails(query: any) {
  let codeFilter = {};

  const typeFilter = query.itemType === 'undefined' ? {} : { itemType: { [Op.like]: `branded` } };
  const nameFilter = query.itemName ? { itemName: { [Op.like]: `%${query.itemName}%` } } : {};
  codeFilter = query.itemCode ? { itemCode: { [Op.like]: `%${query.itemCode}%` } } : {};

  return await Item.findAll({
    attributes: allItemDetailsAttributes.item,
    where: {
      [Op.and]: [typeFilter, nameFilter, codeFilter]
    },
    include: [
      {
        model: ItemStats,
        as: "itemStats",
        attributes: allItemDetailsAttributes.itemStats,
        where: {
          quantity: { [Op.gt]: 0 }
        },
      },
      {
        model: Supplier,
        as: "supplier",
        attributes: allItemDetailsAttributes.supplier
      }
    ],
    order: [["itemStats", "createdAt", "DESC"]]
  });
}

export async function getAllItemDetailsByItemStatId(id: any) {
  return ItemStats.findByPk(id, {
    attributes: allItemDetailsAttributes.itemStats,
    include: [{
      model: Item,
      as: "item",
      attributes: allItemDetailsAttributes.item,
    },
    {
      model: Supplier,
      as: "supplier",
      attributes: allItemDetailsAttributes.supplier
    }]
  })
}


