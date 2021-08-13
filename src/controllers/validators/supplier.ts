import Joi from "@hapi/joi";

export const CREATE_SUPPLIER_REQUEST_BODY = {
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  companyName: Joi.string().optional(),
  email: Joi.string()
    .email()
    .optional(),
  phoneNo: Joi.string().optional(),
  gender: Joi.string().optional(),
  address: Joi.string().optional(),
  description: Joi.string().optional(),
  defaultDiscount: Joi.string().optional(),
  bankAccount: Joi.string().optional(),
  recruiter: Joi.string().optional()
};

export const UPDATE_SUPPLIER_REQUEST_BODY = {
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  companyName: Joi.string().optional(),
  email: Joi.string()
    .email()
    .optional(),
  phoneNo: Joi.string().optional(),
  gender: Joi.string().optional(),
  address: Joi.string().optional(),
  description: Joi.string().optional(),
  defaultDiscount: Joi.string().optional(),
  bankAccount: Joi.string().optional(),
  recruiter: Joi.string().optional()
};
