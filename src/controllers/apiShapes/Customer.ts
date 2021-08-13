export function CustomerShape(customer: any) {
  return {
    id:customer && customer.id,
    firstName: customer && customer.firstName,
    lastName: customer && customer.lastName,
    phoneNo: customer && customer.phoneNo,
    gender: customer && customer.gender,
    bankAccount: customer && customer.bankAccount,
    sales: customer && customer.sales,
    email: customer && customer.email,
    address: customer && customer.address,
    description: customer && customer.description,
    defaultDiscount: customer && customer.defaultDiscount,
    recruiter: customer && customer.recruiter,
  };
}

export function CustomersShape(customer: any) {
  return {
    id:customer && customer.id,
    firstName: customer && customer.firstName,
    lastName: customer && customer.lastName,
    phoneNo: customer && customer.phoneNo,
    gender: customer && customer.gender,
    bankAccount: customer && customer.bankAccount,
    dueTotal: customer && customer.dueTotal,
  };
}
