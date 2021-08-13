import { EMPLOYEE_ROLES } from './constant';

export function canEmployeeLogIn(employee: any) {
  if (!employee) return false;
  const { roleInPOS } = employee;
  switch (roleInPOS) {
    case EMPLOYEE_ROLES.admin:
    case EMPLOYEE_ROLES.cashier:
      return true;
  }
  return false;
}
