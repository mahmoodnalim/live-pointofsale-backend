import Joi from "@hapi/joi";

export const SALE_ROUTE_REQUEST_BODY = {
  totalDiscount: Joi.number(),
  balance: Joi.number(),
  revdAmount:Joi.number(),
  itemSales:Joi.array(),
  customerId: Joi.number(),
  dueDate: Joi.date().optional().allow(null),
  total: Joi.number(),
  paymentType: Joi.object(),
  
};