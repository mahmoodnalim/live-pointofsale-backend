import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
  const token = <string>req.headers["authorization"];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.JWT_SECRET);
      //@ts-ignore
    res.locals.jwtPayload = jwtPayload;
    next();
  } catch (error) {
      //@ts-ignore
    res.status(401).json({
      error: 'Unauthorized request'
    });
    return;
  }
};

export default validateJwt;
