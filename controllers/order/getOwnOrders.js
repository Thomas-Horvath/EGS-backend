const Order = require('../../models/order.js');

const getOrdersByCustomerId = async (req, res) => {
  try {
    const CustomerID = req.user.id;  // Felhasználói azonosító lekérdezése
    const orders = await Order.find({ CustomerID: CustomerID });  // Szűrés a CustomerID alapján
    
    if (orders.length === 0) {
      return res.status(404).json({ error: 'Nincsenek rendelései a megadott felhasználónak' });
    }
    
    res.status(200).json({ ownOrders: orders });  // Eredmények visszaadása ownOrders néven
  } catch (error) {
    console.error('Hiba történt a rendelés lekérdezése során:', error);
    res.status(500).json({ error: 'Hiba történt a rendelés lekérdezése során' });
  }
};

module.exports = getOrdersByCustomerId;
