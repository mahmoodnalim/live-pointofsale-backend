import { Router } from "express";
import {
  getAllSettings,
  getSetting,
  createSettings,
  updateSettings,
} from "../models/Settings";
import {
  CREATE_SETTINGS_REQUEST_BODY,
  UPDATE_SETTINGS_REQUEST_BODY,
} from "./validators/settings";
import requestValidator from "../middleware/requestValidator";
import validateJwt from "../middleware/validateJwt";
import { SettingsShape } from "./apiShapes/Settings";

const settingsRoute = Router();

settingsRoute.get("/", async (_req, res) => {
  try {
    const settings = await getAllSettings();
    if (!settings.length) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(settings.map((setting) => SettingsShape(setting)));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

settingsRoute.get("/:id", validateJwt, async (req, res) => {
  const { id } = req.params;
  try {
    const settings = await getSetting(parseInt(id) || 0);
    if (!settings) res.status(204).json({});
    res.status(200).json(SettingsShape(settings));
  } catch (ex) {
    console.log(ex);
    res.status(res.statusCode || 400).json({
      error: ex.message,
    });
  }
});

settingsRoute.post(
  "/",
  validateJwt,
  requestValidator({ reqBodyValidator: CREATE_SETTINGS_REQUEST_BODY }),
  async (req, res) => {
    try {
      const settings = await createSettings(req.body);
      if (!settings) throw new Error("Unable to create the Settings");
      res.status(201).json(settings);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message,
      });
    }
  }
);

settingsRoute.put(
  "/:id",
  validateJwt,
  requestValidator({ reqBodyValidator: UPDATE_SETTINGS_REQUEST_BODY }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const settings = await updateSettings(parseInt(id), req.body);
      if (!settings) throw new Error("Unable to update the Settings");
      res.status(201).json(settings);
    } catch (ex) {
      console.log(ex);
      res.status(res.statusCode || 400).json({
        error: ex.message,
      });
    }
  }
);



export default settingsRoute;
