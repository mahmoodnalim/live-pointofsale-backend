import { Request, Response, NextFunction } from "express";

export default function(req: Request, res: Response, next: NextFunction) {
   //@ts-ignore
  res.header("Access-Control-Allow-Origin", "*");
   //@ts-ignore
  res.header("Access-Control-Allow-Methods", "*");
  next();
}
