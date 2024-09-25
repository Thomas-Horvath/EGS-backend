const Newsletter = require('../../models/newsletter'); // importáljuk a Newsletter modellt

// Frissítési függvény létrehozása
const updateNewsletterStatus = async (req, res) => {
  try {
    const { email, isActive } = req.body;

    // Ellenőrizzük, hogy megadta-e az _id-t és az isActive értéket
    if ( !email || email === "" || isActive === undefined) {
      return res.status(400).json({ error: 'email és isActive mezők kötelezőek.' });
    }

    // Frissítjük az _id-hoz tartozó isActive értéket
    const updatedNewsletter = await Newsletter.findOneAndUpdate(
      { email },
      { isActive }, // az új érték
      { new: true } // visszaadja a frissített dokumentumot
    );

    // Ha nincs ilyen _id az adatbázisban
    if (!updatedNewsletter) {
      return res.status(404).json({ error: 'Az adott email cím nem található.' });
    }

    // Sikeres frissítés
    res.status(200).json(updatedNewsletter);
  } catch (error) {
    // Hibakezelés
    res.status(500).json({ error: 'Szerver hiba történt.' });
  }
};

module.exports = { updateNewsletterStatus };
