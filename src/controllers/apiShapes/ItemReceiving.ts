export function ItemReceivingsShapes(itemReceiving: any) {
    return {
      id: itemReceiving && itemReceiving.id,
      receivePrice: itemReceiving && itemReceiving.receivePrice,
      discount: itemReceiving && itemReceiving.discount,
      qty: itemReceiving && itemReceiving.qty,
      description: itemReceiving && itemReceiving.description,
    };
  }

export function ItemReceivingShape(itemReceiving: any) {
    return {
      id: itemReceiving && itemReceiving.id,
      receivePrice: itemReceiving && itemReceiving.receivePrice,
      discount: itemReceiving && itemReceiving.discount,
      qty: itemReceiving && itemReceiving.qty,
      description: itemReceiving && itemReceiving.description,
      item: itemReceiving && itemReceiving.item,
      receive: itemReceiving && itemReceiving.receive,
    };
  }
