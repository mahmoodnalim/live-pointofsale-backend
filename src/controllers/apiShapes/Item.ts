export function ItemsShape(item: any) {
  if (item) {
    const { id, barcode, itemCode, itemName, stockNumber, itemType, createdAt, itemStats, supplier, brandId } = item;
    return {
      id,
      itemCode,
      itemName,
      barcode,
      createdAt,
      itemStats,
      supplier,
      stockNumber,
      itemType,
      brandId
    };
  } else {
    return {};
  }
}

export function ItemDetailsShape(itemDetails: any) {
  if (itemDetails) {
    const {
      itemStats,
      supplier,
      brandId,
      reOrderLevel,
      id, itemCode, barcode, stockNumber, itemType, itemName, createdAt, category
    } = itemDetails;
    return {
      id,
      itemCode,
      itemName,
      barcode,
      itemStats,
      createdAt,
      supplier,
      brandId,
      stockNumber,
      itemType,
      category,
      reOrderLevel
    };
  } else {
    return {};
  }
}

export function ItemDetailsByItemStatIdShape(itemDetails: any) {
  if (itemDetails) {
    const {
      id,
      supplier,
      costPrice,
      salesPrice,
      quantity,
      createdAt,
      item: { id: itemId, itemCode, barcode, stockNumber, itemType, itemName, category, brandId }
    } = itemDetails;
    return {
      id: itemId,
      itemCode,
      itemName,
      barcode,
      itemStats: [{ costPrice, salesPrice, quantity, createdAt, id }],
      createdAt,
      supplier,
      brandId,
      stockNumber,
      itemType,
      category
    };
  }
  return undefined;
}

export function ItemShape(item: any) {
  if (item) {
    return {
      id: item.id,
      supplierId: item.supplierId,
      barcode: item.barcode,
      itemCode: item.itemCode,
      itemName: item.itemName,
      stockNumber: item.stockNumber,
      itemType: item.itemType,
      category: item.category,
      brandId: item.brandId,
      reOrderLevel: item.reOrderLevel,
      itemStats: item.itemStats,
      itemSales: item.itemSales,
    };
  }
  else {
    return {}
  }
}
