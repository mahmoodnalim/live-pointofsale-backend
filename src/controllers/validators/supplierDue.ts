import Joi from "@hapi/joi";

export const CREATE_SUPPLIER_DUE_REQUEST_BODY = {
    receiveId: Joi.number().required(),
    dueDate: Joi.date().optional().allow(null),
    supplierId: Joi.number().required(),
    amount: Joi.number().required(),
    description: Joi.string().optional(),
    total: Joi.number().optional()
};

export const UPDATE_SUPPLIER_DUE_REQUEST_BODY = {
    receiveId: Joi.number().required(),
    dueDate: Joi.date().optional().allow(null),
    supplierId: Joi.number().required(),
    amount: Joi.number().optional(),
    description: Joi.string().optional(),
    total: Joi.number().optional()
};