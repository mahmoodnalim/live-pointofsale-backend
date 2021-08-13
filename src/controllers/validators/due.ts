import Joi from "@hapi/joi";

export const CREATE_DUE_REQUEST_BODY = {
    saleId: Joi.number().required(),
    dueDate: Joi.date().optional().allow(null),
    customerId: Joi.number().required(),
    amount: Joi.number().required(),
    description: Joi.string().optional(),
    total: Joi.number().optional()
};

export const UPDATE_DUE_REQUEST_BODY = {
    saleId: Joi.number().required(),
    dueDate: Joi.date().optional().allow(null),
    customerId: Joi.number().required(),
    amount: Joi.number().optional(),
    description: Joi.string().optional(),
    total: Joi.number().optional()
};