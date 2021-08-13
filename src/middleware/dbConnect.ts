import sequelize from "../db";
import { Request, Response, NextFunction } from "express";

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    await sequelize.sync(); //{ alter: true }
    next();
  } catch (ex) {
    console.log(ex);
    res.status(500).json({
      error: ex
    });
  }
}
