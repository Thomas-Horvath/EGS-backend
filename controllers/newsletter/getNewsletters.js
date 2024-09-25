const Newsletter = require('../../models/newsletter.js');

const getNewsletters = async (req, res) => {
    try {
        const newsletters = await Newsletter.find();
        res.status(200).json(newsletters);
    } catch (error) {
        console.error('Hiba történt a felíratkozások lekérdezése során:', error);
        res.status(500).json({ error: 'Hiba történt a felíratkozások lekérdezése során' });
    }
};

module.exports = { getNewsletters };