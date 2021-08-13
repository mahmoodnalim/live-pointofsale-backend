export function BrandShape(brand: any) {
  if (brand) {
    return {
      id: brand.id,
      name: brand.name,
      code: brand.code,
      description: brand.description,
    };
  } else {
    return {};
  }
}

export function BrandsShape(brand: any) {
  if (brand) {
    return {
      id: brand.id,
      name: brand.name,
      code: brand.code,
      description: brand.description,
    };
  } else {
    return {};
  }
}
