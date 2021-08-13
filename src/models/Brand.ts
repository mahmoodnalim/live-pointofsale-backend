import Brand from "../db/Brand";
import IBrand from "../interfaces/IBrand";

export async function createBrand(brand: IBrand) {
  return await Brand.create(brand);
}

export async function updateBrand(id: number, brand: any) {
  const oldBrand = await Brand.findByPk(id);
  if (oldBrand) {
    return await oldBrand.update(brand);
  }
}

export async function deleteBrand(id: number) {
  const oldBrand = await Brand.findByPk(id);
  if (oldBrand) {
    await oldBrand.destroy();
    return oldBrand;
  }
}

export async function getAllBrands() {
  return await Brand.findAll();
}

export async function getBrand(id: number) {
  return await Brand.findByPk(id);
}
