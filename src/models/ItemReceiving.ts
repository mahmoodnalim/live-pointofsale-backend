import ItemReceiving from './../db/ItemReceiving';
import IItemReceiving from './../interfaces/IItemReceiving';
import Item from '../db/Item';
import Receive from '../db/Receive';

const getItemRecvOptions = {
  include: [
    {
      model: Item,
      as: 'item',
    },
    {
      model: Receive,
      as: 'receive',
    },
  ],
};

export async function getAllItemReceivings() {
  return await ItemReceiving.findAll();
}

export async function getItemReceiving(id: number) {
  return await ItemReceiving.findByPk(id, getItemRecvOptions);
}

export async function createItemReceiving(item: any) {
  return await ItemReceiving.create(item);
}
