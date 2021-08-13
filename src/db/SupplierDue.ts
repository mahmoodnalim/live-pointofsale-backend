import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Supplier from "./Supplier";
import Receive from "./Receive";

@Table({
  timestamps: true
})

class SupplierDue extends Model<SupplierDue> {
  
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: "Due date of the credit amount",
    defaultValue: null
  })
  dueDate: Date | undefined;

  @ForeignKey(()=>Receive)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "Receive Id"
  })
  receiveId: number | undefined;

  @BelongsTo(() => Receive)
  receive: Receive | undefined;

  @ForeignKey(()=>Supplier)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "Supplier Id"
  })
  supplierId: number | undefined;

  @BelongsTo(() => Supplier)
  supplier: Supplier | undefined;

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
    comment: "Supplier Due Description"
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
export default SupplierDue;
