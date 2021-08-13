import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Supplier from "./Supplier";
import Item from "./Item";
import ItemReceiving from "./ItemReceiving";

@Table({
  timestamps: true
})
class Receive extends Model<Receive> {
  @HasMany(()=>ItemReceiving)
  itemReceivings: ItemReceiving | undefined
  
  @ForeignKey(()=>Supplier)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "Supplier of the recieving item"
  })
  supplierId: number | undefined;
  
  @BelongsTo(()=>Supplier)
  supplier: Supplier | undefined;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "Total of the recieving bill"
  })
  total: number | undefined;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    comment: "Total Discount of the item"
  })
  totalDiscount: number | undefined;

  // @Column({
  //   type: DataType.JSON,
  //   allowNull: true,
  //   comment: "Payment type of the Receive"
  // })
  // paymentType: string | undefined; 

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    comment: "Payed amount of received amount"
  })
  payedAmount: number | undefined;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    comment: "Balance of the recieved amount"
  })
  balance: number | undefined;
}

export default Receive;

