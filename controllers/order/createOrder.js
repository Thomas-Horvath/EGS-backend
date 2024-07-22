const Order = require('../../models/order.js');

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Hiba történt a rendelés létrehozása során:', error);
    res.status(500).json({ error: 'Hiba történt a rendelés létrehozása során' });
  }
};

module.exports = createOrder;
