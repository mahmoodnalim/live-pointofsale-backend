import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { GENDER } from "../utilities/constant";
import Sale from "./Sale";
import Due from "./Due";

@Table({
  timestamps: true
})
class Customer extends Model<Customer> {
  @HasMany(() => Sale)
  sales: Sale[] | undefined;

  @HasMany(() => Due)
  due: Due[] | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "first Name of the customer"
  })
  firstName: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "last Name of the customer"
  })
  lastName: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    },
    comment: "Email Address of the customer"
  })
  email: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Phone number of the person"
  })
  phoneNo: string | undefined;

  @Column({
    type: DataType.STRING, 
    allowNull: false,
    validate: {
      isIn: {
        args: [Object.keys(GENDER)],
        msg: "Gender can be only 'male' or 'female'"
      }
    },
    comment: "Gender of the employee"
  })
  gender: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Address of the person"
  })
  address: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Description about the person"
  })
  description: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Default Discount for person"
  })
  defaultDiscount: string | undefined;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    comment: "Bank Account Details of the person"
  })
  bankAccount: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "recruiter to the company"
  })
  recruiter: string | undefined;
}

export default Customer;
