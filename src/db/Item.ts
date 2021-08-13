import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import ItemStats from "./ItemStat";
import ItemSale from "./ItemSale";
import ItemReceiving from "./ItemReceiving";
import { ITEM_TYPE } from "../utilities/constant";
import Supplier from "./Supplier";
import Brand from "./Brand";
@Table({
  timestamps: true
})


class Item extends Model<Item> {
  @HasMany(() => ItemStats)
  itemStats: ItemStats[] | undefined;

  @HasMany(() => ItemSale)
  itemSales: ItemSale[] | undefined;

  @HasMany(() => ItemReceiving)
  itemReceive: ItemReceiving[] | undefined;

  @ForeignKey(() => Supplier)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: "Supplier Id"
  })
  supplierId: number | undefined;

  @BelongsTo(() => Supplier)
  supplier: Supplier | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Item barcode"
  })
  barcode: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Item code"
  })
  itemCode: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "Item name"
  })
  itemName: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Item Category"
  })
  category: string | undefined;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      len: [1, 5]
    },
    comment: "Stock number"
  })
  stockNumber: number | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isIn: {
        args: [Object.keys(ITEM_TYPE)],
        msg: "Item type only can be 'Supplier' or 'Branded'"
      }
    },
    comment: "Item type(Supplier or Branded)"
  })
  itemType: string | undefined;

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: "Brand id"
  })
  brandId: number | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Re-order Level"
  })
  reOrderLevel: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Item Description"
  })
  description: string | undefined;
}
export default Item;
