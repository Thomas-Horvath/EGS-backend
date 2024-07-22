const authorizeCustomer = (req, res, next) => {
    if (req.user && req.user.IsAdmin === "0") {
        next();
    } else {
        res.status(403).json({ message: 'Hozzáférés megtagadva. Admin nem férhet hozzá a vásárlói oldalhoz.' });
    }
};

module.exports = authorizeCustomer;
