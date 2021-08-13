import Joi from "@hapi/joi";

export const CREATE_SETTINGS_REQUEST_BODY = {
  logo: Joi.string().optional(),
  companyName: Joi.string().required(),
  address: Joi.string().optional(),
  email: Joi.string()
    .email()
    .optional(),
  websiteUrl: Joi.string().optional(),
  fax: Joi.string().optional(),
  phoneNo: Joi.string().optional(),
  returnPolicy: Joi.string().optional(),
  openingTime: Joi.string().optional(),
  closingTime: Joi.string().optional()
};

export const UPDATE_SETTINGS_REQUEST_BODY = {
  logo: Joi.string().optional(),
  companyName: Joi.string().optional(),
  address: Joi.string().optional(),
  email: Joi.string()
    .email()
    .optional(),
  websiteUrl: Joi.string().optional(),
  fax: Joi.string().optional(),
  phoneNo: Joi.string().optional(),
  returnPolicy: Joi.string().optional(),
  openingTime: Joi.string().optional(),
  closingTime: Joi.string().optional()
};