import Joi from "@hapi/joi";

export const CREATE_ITEM_RECEIVING_REQUEST_BODY = {
    receiveId: Joi.number().required(),
    itemId: Joi.number(),
    discount:Joi.number(),
    receivePrice:Joi.number().required(),
    quantity: Joi.number().required(),
    description:Joi.string().required()
};