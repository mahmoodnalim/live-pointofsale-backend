import { Request, Response, NextFunction } from "express";

export default async function(req: Request, res: Response, next: NextFunction) {
   //@ts-ignore
  res.status(404).json({ error: "API route not found" });
}
