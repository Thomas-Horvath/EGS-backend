const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Rendelési tételek séma
const orderItemSchema = new Schema({
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  UnitPrice: { type: Number, required: true },
  LineTotal: { type: Number, required: true }
});

// Rendelési séma
const orderSchema = new Schema({
  OrderID: { type: Number, required: true, unique: true },
  Customerid: { type: Number, required: true },
  OrderStatus: { type: String, required: true },
  OrderDate: { type: Date, required: true },
  SubTotal: { type: Number, required: true },
  Freight: { type: Number, required: true },
  DeliveryTypeID: { type: Number, required: true },
  TotalDue: { type: Number, required: true },
  Comment: { type: String, default: "" },
  OrderItems: [orderItemSchema] // Al sémák beágyazása
});

// Model létrehozása
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
