import Joi from "@hapi/joi";

export const CREATE_CUSTOMER_REQUEST_BODY = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
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

export const UPDATE_CUSTOMER_REQUEST_BODY = {
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
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
