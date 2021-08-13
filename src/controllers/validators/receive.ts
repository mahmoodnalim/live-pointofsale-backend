import Joi from '@hapi/joi';

export const CREATE_RECEIVE_REQUEST_BODY = {
  supplierId: Joi.number(),
  total: Joi.number(),
  totalDiscount: Joi.number(),
  paymentType: Joi.object(),
  payedAmount: Joi.number(),
  balance: Joi.number(),
  itemReceives: Joi.array(),
  dueDate: Joi.date().optional().allow(null),
};
