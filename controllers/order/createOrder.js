const Order = require('../../models/order.js');
const orderSchema = require('../../validationSchemas/orderSchema.js');

const createOrder = async (req, res) => {
  try {
    const { ...newProdectData } = req.body;
    // Lekérdezzük a legmagasabb orderID-vel rendelkező rendelést
    const maxOrder = await Order.findOne().sort({ OrderID: -1 }).exec();
    const newOrderId = maxOrder ? maxOrder.OrderID + 1 : 1;

    // Validáljuk a beérkező adatokat
    const { error } = orderSchema.validate(newProdectData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }


    // Új rendelés létrehozása az új OrderID-val
    const newOrder = new Order({
      ...newProdectData,
      OrderID: newOrderId,
    });


    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Hiba történt a rendelés létrehozása során:', error.message);
    res.status(500).json({ error: 'Hiba történt a rendelés létrehozása során' });
  }
};

module.exports = createOrder;
