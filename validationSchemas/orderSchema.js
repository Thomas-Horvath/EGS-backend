const Joi = require('joi');

// Rendelési tételek validálási séma
const orderItemSchema = Joi.object({
  ProductID: Joi.number().required(),
  Quantity: Joi.number().required().min(1),
  UnitPrice: Joi.number().required().min(0),
  LineTotal: Joi.number().required().min(0)
});

// Rendelési validálási séma
const orderSchema = Joi.object({
  CustomerID: Joi.number().required(),
  OrderStatus: Joi.string().required(),
  OrderDate: Joi.date().default(Date.now),
  SubTotal: Joi.number().required().min(0),
  Freight: Joi.number().required().min(0),
  DeliveryTypeID: Joi.number().required(),
  TotalDue: Joi.number().required().min(0),
  Comment: Joi.string().allow(''),
  OrderItems: Joi.array().items(orderItemSchema).required() // Al sémák beágyazása
});

module.exports = orderSchema;
