const Joi = require('joi');

const userRegisterSchema = Joi.object({
    UserName: Joi.string().required(),
    Password: Joi.string().required(),
    IsAdmin: Joi.boolean().default(false),
    AdminRole: Joi.string().allow(''),
    JobTitle: Joi.string().allow(''),
    BirthDate: Joi.date().allow(null),
    LastName: Joi.string().allow(''),
    FirstName: Joi.string().allow(''),
    EmailAddress: Joi.string().email().required(),
    PhoneNumber: Joi.string().allow(''),
    Postcode: Joi.string().allow(''),
    City: Joi.string().allow(''),
    Address: Joi.string().allow(''),
    ShippingPostcode: Joi.string().allow(''),
    ShippingCity: Joi.string().allow(''),
    ShippingAddress: Joi.string().allow(''),
    InvoicePostcode: Joi.string().allow(''),
    InvoiceCity: Joi.string().allow(''),
    InvoiceAddress: Joi.string().allow(''),
    ActiveFlag: Joi.boolean().default(true)
});

module.exports = userRegisterSchema;