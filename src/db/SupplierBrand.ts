import { Table, ForeignKey, Column } from "sequelize-typescript";
import { Model } from "sequelize/types";
import Supplier from "./Supplier";
import Brand from "./Brand";


@Table
class SupplierBrand extends Model<SupplierBrand> {
  @ForeignKey(() => Supplier)
  @Column
  supplierId: number | undefined;

  @ForeignKey(() => Brand)
  @Column
  brandId: number | undefined;
}

export default SupplierBrand;
