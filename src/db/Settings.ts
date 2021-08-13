import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: true
  })
class Settings extends Model<Settings>{
    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: "company's or the shop's logo"
      })
      logo: string | undefined;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notNull: true
        },
        comment: "Name of the company or the shop"
      })
      companyName: string | undefined;

      @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notNull: true
        },
        comment: "Address of the company or the shop"
      })
      address: string | undefined;

      @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
          isEmail: true
        },
        comment: "Email Address of the company or the shop"
      })
      email: string | undefined;

      @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: "Website URL of the company or the shop"
      })
      websiteUrl: string | undefined;

      @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
          len: [2, 10]
        },
        comment: "Phone number of the company or the shop"
      })
      phoneNo: string | undefined;

      @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
          len: [2, 10]
        },
        comment: "Fax number of the company or the shop"
      })
      fax: string | undefined;

      @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: "Return policy of the company or the shop"
      })
      returnPolicy: string | undefined;

      @Column({
        type: DataType.TIME,
        allowNull: true,
        comment: "Opening time of the company or the shop"
      })
      openingTime: string | undefined;

      @Column({
        type: DataType.TIME,
        allowNull: true,
        comment: "Closing time of the company or the shop"
      })
      closingTime: string | undefined;

}

export default Settings;