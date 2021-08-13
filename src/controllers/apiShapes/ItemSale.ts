export function ItemSalesShape(itemSale: any) {
  return {
    id: itemSale && itemSale.id,
    saleId: itemSale && itemSale.saleId,
    costPrice: itemSale && itemSale.costPrice,
    sellingPrice: itemSale && itemSale.sellingPrice,
    discount: itemSale && itemSale.discount,
    quantity: itemSale && itemSale.quantity,
    description: itemSale && itemSale.description,
  };
}

export function ItemSaleShape(itemSale: any) {
  return {
    id: itemSale && itemSale.id,
    costPrice: itemSale && itemSale.costPrice,
    sellingPrice: itemSale && itemSale.sellingPrice,
    discount: itemSale && itemSale.discount,
    quantity: itemSale && itemSale.quantity,
    description: itemSale && itemSale.description,
    sale: itemSale && itemSale.sale,
    item: itemSale && itemSale.item,
  };
}
