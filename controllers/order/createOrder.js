const Order = require('../../models/order.js');

const createOrder = async (req, res) => {
  try {
    // Lekérdezzük a legmagasabb orderID-vel rendelkező rendelést
    const maxOrder = await Order.findOne().sort({ OrderID: -1 }).exec();
    const newOrderId = maxOrder ? maxOrder.OrderID + 1 : 1;


    // Új rendelés létrehozása az új OrderID-val
    const newOrder = new Order({
      OrderID: newOrderId,
      Customerid: req.body.Customerid,
      OrderStatus: req.body.OrderStatus,
      OrderDate: req.body.OrderDate,
      SubTotal: req.body.SubTotal,
      Freight: req.body.Freight,
      DeliveryTypeID: req.body.DeliveryTypeID,
      TotalDue: req.body.TotalDue,
      Comment: req.body.Comment,
      OrderItems: req.body.OrderItems
    });


    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Hiba történt a rendelés létrehozása során:', error.message);
    res.status(500).json({ error: 'Hiba történt a rendelés létrehozása során' });
  }
};

module.exports = createOrder;
