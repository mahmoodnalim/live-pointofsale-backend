import { canEmployeeLogIn } from "../../utilities/authHelper";

export function EmployeesShape(employee: any) {
  return {
    id: employee && employee.id,
    firstName: employee && employee.firstName,
    lastName: employee && employee.lastName,
    phoneNo: employee && employee.phoneNo,
    gender: employee && employee.gender,
    bankAccount: employee && employee.bankAccount,
    canLogIn: canEmployeeLogIn(employee),
    isFirstTimeLogin: employee && !employee.password
  };
}

export function EmployeeShape(employee: any) {
  return {
    id: employee && employee.id,
    firstName: employee && employee.firstName,
    lastName: employee && employee.lastName,
    phoneNo: employee && employee.phoneNo,
    gender: employee && employee.gender,
    bankAccount: employee && employee.bankAccount,
    email: employee && employee.email,
    address: employee && employee.address,
    description: employee && employee.description,
    defaultDiscount: employee && employee.defaultDiscount,
    recruiter: employee && employee.recruiter,
    roleInPOS: employee && employee.roleInPOS
  };
}
