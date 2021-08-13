import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({ timestamps: true })
class Person extends Model<Person> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "first Name of the person"
  })
  firstName: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "last Name of the person."
  })
  lastName: string | undefined;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: "the person whether admin or not"
  })
  isAdmin: boolean | undefined;
}

export default Person;
