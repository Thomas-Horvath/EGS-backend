
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.IsAdmin === "1") {
        next();
    } else {
        return res.status(403).json({ message: 'Hozzáférés megtagadva' });
    }

};

module.exports = authorizeAdmin;
