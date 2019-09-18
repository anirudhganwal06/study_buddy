module.exports = (req, res, next) => {
    if (req.session.isLoggedIn === true && req.session.userId === req.params.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};