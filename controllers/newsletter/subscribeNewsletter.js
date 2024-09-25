const Newsletter = require('../../models/newsletter.js');

const addNewsletter = async (req, res) => {
  try {
    const { email, isActive } = req.body;

    // Ellenőrizzük, hogy van-e email cím
    if (!email) {
      return res.status(400).json({ error: 'Email cím megadása kötelező' });
    }

    // Új email cím hozzáadása
    const newSubscription = new Newsletter({ email, isActive });
    await newSubscription.save();

    res.status(201).json({
      message: 'Email cím sikeresen hozzáadva!',
      subscription: newSubscription
    });
  } catch (error) {
    console.error('Hiba az email cím hozzáadásakor:', error);
    res.status(500).json({ error: 'Hiba történt az email cím hozzáadásakor' });
  }
};

module.exports = { addNewsletter };

