import { Router } from "express";
import { getAllSettings, findByIdAndUpdate } from "../models/AppConfig";
import { AppConfig } from "./apiShapes/AppConfig";

const appConfigRoute = Router();

appConfigRoute.get("/", async (req, res) => {
  try {
    const settings = await getAllSettings();
    if (!settings.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(settings.map(setting => AppConfig(setting)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

appConfigRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const setting = await findByIdAndUpdate(parseInt(id), req.body);
    if (!setting) throw new Error("Unable to update the Setting");
    res.status(204).json(setting);
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message
    });
  }
});

export default appConfigRoute;
