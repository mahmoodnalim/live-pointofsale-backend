import IEmployee from '../interfaces/IEmployee';
import Employee from '../db/Employee';
import { canEmployeeLogIn } from '../utilities/authHelper';

export async function getAllEmployees() {
  return await Employee.findAll();
}

export async function isValidPassword(id: number, password: string) {
  try {
    const employee = await Employee.findByPk(id);
    if (!canEmployeeLogIn(employee)) {
      // employee does not have the permission to login
      return null;
    }
    let validPassword = employee?.isValidPassword(password);
    if (validPassword === null) {
      // first time login
      // update the password
      await employee?.hashingPassword(password);
      validPassword = true;
    }
    return validPassword ? employee : false;
  } catch (ex) {
    return false;
  }
}

export async function getEmployee(id: number) {
  return await Employee.findByPk(id);
}

export async function createEmployee(employee: IEmployee) {
  return await Employee.create(employee);
}

export async function updateEmployee(id: number, employee: any) {
  const oldEmployee = await Employee.findByPk(id);
  if (oldEmployee) {
    const newEmployee = await oldEmployee.update(employee);
    return newEmployee;
  }
}

export async function deleteEmployee(id: number) {
  const oldEmployee = await Employee.findByPk(id);
  if (oldEmployee) {
    await oldEmployee.destroy();
    return oldEmployee;
  }
}
