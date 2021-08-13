import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
// import Supplier from "./Supplier";
// import SupplierBrand from "./SupplierBrand";

@Table({
  timestamps: true
})
class Brand extends Model<Brand> {
  // @BelongsToMany(() => Supplier, () => SupplierBrand)
  // suppliers: Array<Brand & {
  //   SupplierBrand: SupplierBrand;
  // }> | undefined

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true
    },
    comment: "Brand Name"
  })
  name: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: true,
    },
    comment: "brand code"
  })
  code: string | undefined;

  @Column({
    type: DataType.STRING,
    comment: "Description of the brand"
  })
  description: string | undefined;

}

export default Brand;