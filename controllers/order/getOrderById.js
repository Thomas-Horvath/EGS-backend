const Order = require('../../models/order.js');

const getOrderById = async (req, res) => {
  try {
    const id = Number(req.params.id); 
    const order = await Order.findOne({ OrderID: id });
    if (!order) {
      return res.status(404).json({ error: 'Rendelés nem található' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Hiba történt a rendelés lekérdezése során:', error);
    res.status(500).json({ error: 'Hiba történt a rendelés lekérdezése során' });
  }
};

module.exports = getOrderById;
