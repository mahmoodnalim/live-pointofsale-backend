import Sequelize from "sequelize";
import ICustomer from '../interfaces/ICustomer';
import Customer from '../db/Customer';
import Sale from '../db/Sale';
import { Op } from "sequelize";
import Due from '../db/Due';
import sequelize from "../db";
const getSaleOptions = {
  include: [
    {
      model: Sale,
      as: 'sales'
    }
  ]
};

export async function getAllCustomers(limit: any) {
  let itemLimit;
  if ("limit" in limit) {
    itemLimit = limit.limit;
  } else {
    itemLimit = 10;
  }
  const [allCustomers, metadata] = await sequelize.query(
    `SELECT 
	    c.id, 
	    c.firstName,
      c.lastName, 
      c.phoneNo,
      c.gender,
      c.bankAccount,
	    SUM(d.amount) as dueTotal 
    from Customers c 
    LEFT JOIN Dues d 
    ON c.id = d.customerId
    GROUP BY c.id`
);
  
  return allCustomers;
  
}

export async function getCustomer(id: number) {
  return await Customer.findByPk(id, getSaleOptions);
}

export async function createCustomer(customer: ICustomer) {
  return await Customer.create(customer);
}

export async function updateCustomer(id: number, customer: any) {
  const oldCustomer = await Customer.findByPk(id);
  if (oldCustomer) {
    const newCustomer = await oldCustomer.update(customer);
    return newCustomer;
  }
}

export async function deleteCustomer(id: number) {
  const oldCustomer = await Customer.findByPk(id);
  if (oldCustomer) {
    await oldCustomer.destroy();
    return oldCustomer;
  }
}

export async function searchCustomer(q: any) {
  const customerId = await Customer.findAll({
    attributes: ["id"],
    where: {
      [Op.or]: [
        { id: { [Op.like]: `%${q}%` } },
        { firstName: { [Op.like]: `%${q}%` } },
        { lastName: { [Op.like]: `%${q}%` } },
      ],
    },
  });
  const i_id = customerId.map((tag) => tag.id);
  const customer = await Customer.findAll({
    attributes: ["id", "firstName", "lastName", "email"],
    where: { id: i_id },
    
  });
  return customer;
}

