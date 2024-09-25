const Newsletter = require('../../models/newsletter'); // importáljuk a Newsletter modellt

// Frissítési függvény létrehozása
const deleteNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        // Ellenőrizzük, hogy megkaptuk e az emailt
        if (!email || email === "") {
            return res.status(400).json({ error: 'Hiányzó email cím!' });
        }

        // Töröljük az emailhez tartozó dokumentumot
        const deletedNewsletter = await Newsletter.findOneAndDelete({ email });

        // Ha nincs ilyen email az adatbázisban
        if (!deletedNewsletter) {
            return res.status(404).json({ error: 'Az adott email cím nem található.' });
        }

        // Sikeres frissítés
        res.status(200).json(deletedNewsletter);
    } catch (error) {
        // Hibakezelés
        res.status(500).json({ error: 'Szerver hiba történt.' });
    }
};

module.exports = { deleteNewsletter };
