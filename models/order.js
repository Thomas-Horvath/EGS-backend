const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Rendelési tételek séma
const orderItemSchema = new Schema({
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true, min: 1 },
  UnitPrice: { type: Number, required: true, min: 0 },
  LineTotal: { type: Number, required: true, min: 0 }
});

// Rendelési séma
const orderSchema = new Schema({
  OrderID: { type: Number, required: true, unique: true },
  CustomerID: { type: Number, required: true },
  OrderStatus: { type: String, required: true },
  OrderDate: { type: Date, required: true , default: Date.now },
  SubTotal: { type: Number, required: true, min: 0},
  Freight: { type: Number, required: true, min: 0 },
  DeliveryTypeID: { type: Number, required: true },
  TotalDue: { type: Number, required: true, min: 0 },
  Comment: { type: String, default: "" },
  OrderItems: [orderItemSchema] // Al sémák beágyazása
});

// Model létrehozása
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
