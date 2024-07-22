const Order = require('../../models/order.js');

// getAllOrders vezérlő
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
    console.log(orders);
  } catch (error) {
    console.error('Hiba történt a rendelések lekérdezése során:', error);
    res.status(500).json({ error: 'Hiba történt a rendelések lekérdezése során' });
  }
};

module.exports = getAllOrders;
