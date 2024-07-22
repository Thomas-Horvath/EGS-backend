const Order = require('../../models/order.js');

const deleteOrder = async (req, res) => {
  try {
    const id = Number(req.params.id); 
    const deletedOrder = await Order.findOneAndDelete({OrderID: id});
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Rendelés nem található' });
    }
    res.status(200).json({ message: 'Rendelés sikeresen törölve' });
  } catch (error) {
    console.error('Hiba történt a rendelés törlése során:', error);
    res.status(500).json({ error: 'Hiba történt a rendelés törlése során' });
  }
};

module.exports = deleteOrder;
