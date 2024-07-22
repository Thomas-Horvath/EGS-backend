const Order = require('../../models/order.js');

const updateOrder = async (req, res) => {
    try {
        const id = Number(req.params.id); // Megkapjuk a kérés URL-jében a termék ID-jét
        const { ...updateData } = req.body; // Az update-hez szükséges adatok


        const updatedOrder = await Order.findOneAndUpdate({ OrderID: id }, updateData, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Rendelés nem található' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Hiba történt a rendelés frissítése során:', error);
        res.status(500).json({ error: 'Hiba történt a rendelés frissítése során' });
    }
};

module.exports = updateOrder;
