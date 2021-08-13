export function SalesShape(dailySales: any) {
  if (dailySales) {
    return {
      saleSummary: dailySales[0],
      dateRange: dailySales[1],
      sales: dailySales[2],
    };
  } else {
    return {};
  }
}

export function TotalCountShape(totalCountOfEntries: any){
  const { sales, items, customers, suppliers, employees } = totalCountOfEntries;
  if (totalCountOfEntries) {
    return {
      salesCount: sales,
      itemsCount: items,
      customersCount: customers,
      suppliersCount: suppliers,
      employeesCount: employees,
    };
  } else {
    return {};
  }
}
