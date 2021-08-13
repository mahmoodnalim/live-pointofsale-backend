import Joi from "@hapi/joi";

export const CREATE_ITEM_REQUEST_BODY = {
  supplierId: Joi.number().optional(),
  barcode: Joi.string().optional(),
  itemCode: Joi.string().optional(),
  itemName: Joi.string().required(),
  category: Joi.string().optional(),
  stockNumber: Joi.number().optional(),
  itemType: Joi.string().optional(),
  brandId: Joi.number().optional().allow(null),
  reOrderLevel: Joi.number().optional(),
  description: Joi.string().optional(),
};

export const UPDATE_ITEM_REQUEST_BODY = {
  supplierId: Joi.number().optional(),
  barcode: Joi.string().optional(),
  itemCode: Joi.string().optional(),
  itemName: Joi.string().optional(),
  category: Joi.string().optional(),
  stockNumber: Joi.number().optional(),
  itemType: Joi.string().optional(),
  brandId: Joi.number().optional().allow(null),
  reOrderLevel: Joi.number().optional(),
  description: Joi.string().optional(),
};
