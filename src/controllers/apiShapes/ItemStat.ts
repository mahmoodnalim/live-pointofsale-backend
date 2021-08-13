export function ItemStatsShape(itemStats: any) {
  return {
    id: itemStats && itemStats.id,
    supplierId: itemStats && itemStats.supplierId,
    itemId: itemStats && itemStats.itemId,
    costPrice: itemStats && itemStats.costPrice,
    salesPrice: itemStats && itemStats.salesPrice,
    quantity: itemStats && itemStats.quantity,
  };
}

export function ItemStatShape(itemStats: any) {
  return {
    id: itemStats && itemStats.id,
    costPrice: itemStats && itemStats.costPrice,
    salesPrice: itemStats && itemStats.salesPrice,
    quantity: itemStats && itemStats.quantity,
    supplier: itemStats && itemStats.supplier,
    item: itemStats && itemStats.item,
  };
}

export function ItemSearchShape(itemStats: any) {
  if (itemStats) {
    return {
      itemStatId: itemStats.id,
      costPrice: itemStats.costPrice,
      salesPrice: itemStats.salesPrice,
      quantity: itemStats.quantity,
      receivedDate: itemStats.createdAt,
      item: {
        id: itemStats.item.id,
        itemName: itemStats.item.itemName,
        itemCode: itemStats.item.itemCode,
        category: itemStats.item.category,
        supplier: {
          id: itemStats.item.supplier?.id,
          firstName: itemStats.item.supplier?.firstName,
          lastName: itemStats.item.supplier?.lastName,
          companyName: itemStats.item.supplier?.companyName,
        },
      },
    };
  }
  return {}
}
