import ISale from "../../interfaces/ISale";

export function SalesShape(sales: any) {
  if (sales) {
    return {
      sales: sales[0],
      dateRange: sales[1],
      saleSummary: sales[2]
    };
  } else {
    return {}
  }

}

export function SaleShape(sale: any) {
  if (sale) {
  const itemDetails:ISale["itemDetails"] = [];
  const { id, customer, total, totalDiscount, balance, itemSales } = sale;
    if (Array.isArray(itemSales)) {
      itemSales.forEach(({ item: { itemName }, discount, quantity, sellingPrice, itemId }) => {
        itemDetails.push({ itemName, discount, quantity, sellingPrice, itemId })
      })
    }
    return {
      id,
      customerName: customer.firstName + " " + customer.lastName,
      total,
      totalDiscount,
      balance,
      itemDetails,
    };
  } else {
    return {};
  }
}
