import Joi from '@hapi/joi';

export const CREATE_BRAND_REQUEST_BODY = {
  name: Joi.string().required(),
  code: Joi.string().required(),
  description: Joi.string().optional(),
};

export const UPDATE_BRAND_REQUEST_BODY = {
  name: Joi.string().required(),
  code: Joi.string().required(),
  description: Joi.string().optional(),
};
