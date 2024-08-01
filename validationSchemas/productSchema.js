const Joi = require('joi');

const productSchema = Joi.object({
    Name: Joi.string().required(),
    Model: Joi.string().required(),
    Color: Joi.string().allow(''),
    Quality: Joi.string().required(),
    BundsNumber: Joi.string().allow(''),
    Body: Joi.string().allow(''),
    Neck: Joi.string().allow(''),
    FretBoard: Joi.string().allow(''),
    Pickup: Joi.string().allow(''),
    Weight: Joi.number().default(0).min(0),
    ChannelsNumber: Joi.number().default(0).min(0),
    SpeakersNumber: Joi.number().default(0).min(0),
    Wattage: Joi.number().default(0).min(0),
    Width: Joi.number().default(0).min(0),
    Length: Joi.number().default(0).min(0),
    Thickness: Joi.number().default(0).min(0),
    CableLength: Joi.number().default(0).min(0),
    ConnectorType: Joi.string().allow(''),
    Radius: Joi.string().allow(''),
    CategoryName: Joi.string().required(),
    SubCategoryName: Joi.string().required(),
    BrandName: Joi.string().required(),
    Price: Joi.number().required().min(0),
    Description: Joi.string().required(),
    ProductPhotoURL: Joi.string().required(),
    OnSale: Joi.boolean().default(false),
    SalePrice: Joi.number().default(0).min(0),
    InStock: Joi.boolean().default(true),
  });

  module.exports = productSchema;