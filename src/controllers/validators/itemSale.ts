import Joi from "@hapi/joi";

export const CREATE_ITEM_SALE_REQUEST_BODY = {
  saleId: Joi.number(),
  itemId: Joi.number(),
  costPrice: Joi.number(),
  sellingPrice: Joi.number(),
  discount: Joi.number(),
  quantity: Joi.number(),
  description: Joi.string(),
};
