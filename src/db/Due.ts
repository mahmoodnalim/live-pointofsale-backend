import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Customer from "./Customer";
import Sale from "./Sale";

@Table({
  timestamps: true
})

class Due extends Model<Due> {
  
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: "Due date of the credit amount",
    defaultValue: null
  })
  dueDate: Date | undefined;

  @ForeignKey(()=>Sale)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "Sale Id"
  })
  saleId: number | undefined;

  @BelongsTo(() => Sale)
  sale: Sale | undefined;

  @ForeignKey(()=>Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "Customer Id"
  })
  customerId: number | undefined;

  @BelongsTo(() => Customer)
  customer: Customer | undefined;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
        notNull: true
    },
    comment: "Amount of Due"
  })
  amount: number | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Due Description"
  })
  description: string | undefined;

  @Column({
    type: DataType.FLOAT,
    allowNull:false,
    validate: {
        notNull: true
    },
    comment: "Total Amount"
  })
  total: number | undefined;


}
export default Due;
