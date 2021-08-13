import Joi from '@hapi/joi';

export const LOGIN_BODY_VALIDATOR = {
  employeeId: Joi.number().required(),
  password: Joi.string().required()
};
