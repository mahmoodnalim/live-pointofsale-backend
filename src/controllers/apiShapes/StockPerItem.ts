export const StockPerItemShape = (itemStock: any) => {
  if (itemStock) {
    return {
      itemId: itemStock.id,
      itemName: itemStock.itemName,
      itemCode: itemStock.itemCode,
      qty: itemStock.itemStats[0],
      companyName: itemStock.supplier ?.companyName,
      reOrderLevel: itemStock.reOrderLevel,
    }
  }
  return {}
}