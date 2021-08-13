import { Model, Table, Column, DataType } from "sequelize-typescript";
import { EMPLOYEE_ROLES, GENDER } from "../utilities/constant";
import bcrypt from "bcrypt";
import config from "../config";

@Table({
  timestamps: true
})
class Employee extends Model<Employee> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "first Name of the employee"
  })
  firstName: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "last Name of the employee"
  })
  lastName: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    },
    comment: "Email Address of the employee"
  })
  email: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Phone number of the employee"
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
    comment: "Address of the employee"
  })
  address: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Description about the employee"
  })
  description: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Default Discount for employee"
  })
  defaultDiscount: string | undefined;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    comment: "Bank Account Details of the employee"
  })
  bankAccount: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "recruiter to the company."
  })
  recruiter: string | undefined;

  @Column({
    type: DataType.STRING,
    defaultValue: EMPLOYEE_ROLES.none,
    validate: {
      isIn: {
        args: [Object.keys(EMPLOYEE_ROLES)],
        msg: "Invalid Employee Role"
      }
    },
    comment: "Role in POS."
  })
  roleInPOS: string | undefined;

  @Column({
    type: DataType.STRING
  })
  private password: string | undefined;

  async hashingPassword(password: string) {
    this.password = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(config.BCRYPT_SALT)
    );
    await this.save();
  }

  isValidPassword(password: string) {
    if (!this.password) return null;
    return bcrypt.compareSync(password, this.password);
  }
}

export default Employee;
