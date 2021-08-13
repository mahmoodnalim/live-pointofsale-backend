import unique_feature from "../config/FeaturesConfig";
import { Router } from "express";

const featureRoute = Router();

featureRoute.get("/unique_features", async (req, res) => {
  try {
    const { key } = req.params;
    if (key) res.status(200).json({ key: unique_feature[key] });
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

export default featureRoute;
