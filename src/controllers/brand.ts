import { Router } from "express";
import { BrandShape, BrandsShape } from "./apiShapes/Brand";
import { getAllBrands, createBrand, getBrand, deleteBrand, updateBrand } from "../models/Brand";
import requestValidator from "../middleware/requestValidator";
import { CREATE_BRAND_REQUEST_BODY, UPDATE_BRAND_REQUEST_BODY } from "./validators/brand";

const brandRoute = Router();

brandRoute.get("/", async (_req, res) => {
  try {
    const brands = await getAllBrands();
    if (!brands.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(brands.map(brand => BrandsShape(brand)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

brandRoute.post(
  "/",
  requestValidator({ reqBodyValidator: CREATE_BRAND_REQUEST_BODY }),
  async (req, res) => {
    try {
      const brand = await createBrand(req.body);
      if (!brand) throw new Error("Unable to create brand");
      res.status(201).json(brand);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message
      });
    }
  }
);

brandRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await getBrand(parseInt(id) || 0);
    if (!customer) res.status(204).json({});
    res.status(200).json(BrandShape(customer));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

brandRoute.put("/:id", async (req, res) => {
  requestValidator({ reqBodyValidator: UPDATE_BRAND_REQUEST_BODY });
  const { id } = req.params;
  try {
    const brand = await updateBrand(parseInt(id), req.body);
    if (!brand) throw new Error("Unable to update the brand");
    res.status(204).json(brand);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

brandRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await deleteBrand(parseInt(id));
    if (!brand) throw new Error("Unable to delete the brand");
    res.status(201).json(brand);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

export default brandRoute;