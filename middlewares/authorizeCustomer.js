const authorizeCustomer = (req, res, next) => {
    if (req.user && req.user.IsAdmin === false ) {
        next();
    } else {
        return res.status(403).json({ message: 'Hozzáférés megtagadva' });
    }

};

module.exports = authorizeCustomer;


