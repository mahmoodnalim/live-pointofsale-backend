import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import validatorParams from '../interfaces/IValidatorParams';

export default (schema: validatorParams) =>
  function(req: Request, res: Response, next: NextFunction) {
    const {
      reqBodyValidator,
      reqParamsValidator,
      reqQueryParamsValidator
    } = schema;
    try {
      if (reqBodyValidator) {
        const { error } = Joi.object(reqBodyValidator).validate(req.body);
        if (error) throw error;
      }
      if (reqParamsValidator) {
        const { error } = Joi.object(reqParamsValidator).validate(req.params);
        if (error) throw error;
      }
      if (reqQueryParamsValidator) {
        const { error } = Joi.object(reqQueryParamsValidator).validate(
          req.query
        );
        if (error) throw error;
      }
      next();
    } catch (ex) {
      res.status(400).json({ error: ex.message });
    }
  };
