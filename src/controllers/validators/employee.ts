import Joi from "@hapi/joi";
import { EMPLOYEE_ROLES, GENDER } from "../../utilities/constant";

export const CREATE_EMPLOYEE_REQUEST_BODY = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .optional(),
  phoneNo: Joi.string().optional(),
  gender: Joi.string()
    .valid(...Object.keys(GENDER))
    .error(new Error("Gender can be one of male or female"))
    .optional(),
  address: Joi.string().optional(),
  description: Joi.string().optional(),
  defaultDiscount: Joi.string().optional(),
  bankAccount: Joi.string().optional(),
  recruiter: Joi.string().optional(),
  roleInPOS: Joi.valid(...Object.keys(EMPLOYEE_ROLES))
    .error(new Error("Invalid POS Role"))
    .default(EMPLOYEE_ROLES.none)
};

export const UPDATE_EMPLOYEE_REQUEST_BODY = {
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string()
    .email()
    .optional(),
  phoneNo: Joi.string().optional(),
  gender: Joi.any()
    .valid(...Object.keys(GENDER))
    .optional(),
  address: Joi.string().optional(),
  description: Joi.string().optional(),
  defaultDiscount: Joi.string().optional(),
  bankAccount: Joi.string().optional(),
  recruiter: Joi.string().optional()
};
