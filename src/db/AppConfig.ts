import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({ timestamps: true })
class AppConfig extends Model<AppConfig> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "App Config key"
  })
  key: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "App Config value"
  })
  value: string | undefined;
}

export default AppConfig;
