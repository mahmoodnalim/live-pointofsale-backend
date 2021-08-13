export function SuppliersShape(supplier: any) {
  if (supplier) {
    return {
      id: supplier.id,
      firstName: supplier.firstName,
      lastName: supplier.lastName,
      companyName: supplier.companyName,
      phoneNo: supplier.phoneNo
    }
  }
  return {};
}

export function SupplierShape(supplier: any) {
  return {
    id: supplier && supplier.id,
    firstName: supplier && supplier.firstName,
    lastName: supplier && supplier.lastName,
    companyName: supplier && supplier.companyName,
    phoneNo: supplier && supplier.phoneNo,
    gender: supplier && supplier.gender,
    bankAccount: supplier && supplier.bankAccount,
    email: supplier && supplier.email,
    address: supplier && supplier.address,
    description: supplier && supplier.description,
    defaultDiscount: supplier && supplier.defaultDiscount,
    itemStats: supplier && supplier.itemStats,
    receivings: supplier && supplier.receivings,
  };
}
