import IReceive from '../../interfaces/IReceive';

export function ReceivesShape(receivings: any) {
  if (receivings) {
    return {
      receivings: receivings[0],
      dateRange: receivings[1],
      receiveSummary: receivings[2],
    };
  } else {
    return {};
  }
}

export function ReceiveShape(receiving: any) {
  if (receiving) {
    const itemDetails: IReceive['itemDetails'] = [];
    const {
      id,
      supplier,
      total,
      totalDiscount,
      paymentType,
      balance,
      itemReceives,
    } = receiving;
    if (Array.isArray(itemReceives)) {
      itemReceives.forEach(
        ({
          item: { itemName },
          discount,
          quantity,
          receivingPrice,
          itemId,
        }) => {
          itemDetails.push({
            itemName,
            discount,
            quantity,
            receivingPrice,
            itemId,
          });
        }
      );
    }
    return {
      id,
      supplierName: supplier.firstName + ' ' + supplier.lastName,
      total,
      totalDiscount,
      paymentType,
      balance,
      itemDetails,
    };
  } else {
    return {};
  }
}

