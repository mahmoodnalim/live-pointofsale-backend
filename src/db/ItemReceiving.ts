import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Receive from './Receive';
import Item from './Item';

@Table({
  timestamps: true,
})
class ItemReceiving extends Model<ItemReceiving> {
  @ForeignKey(() => Receive)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
    },
    comment: 'receive ref',
  })
  receiveId: number | undefined;

  @BelongsTo(() => Receive)
  receive: Receive | undefined;

  @ForeignKey(() => Item)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
    },
    comment: 'item ref',
  })
  itemId: number | undefined;

  @BelongsTo(() => Item)
  item: Item | undefined;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      notNull: true,
    },
    comment: 'receive price of the item',
  })
  receivePrice: number | undefined;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      notNull: true,
    },
    comment: 'discount of received item',
  })
  discount: number | undefined;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
    },
    comment: 'item received quantitity',
  })
  quantity: number | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true,
    },
    comment: 'description of the item',
  })
  description: string | undefined;
}
export default ItemReceiving;
