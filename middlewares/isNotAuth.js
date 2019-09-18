module.exports = (req, res, next) => {
    if (req.session.isLoggedIn === true) {
        res.redirect('/' + req.session.rollNo);
    } else {
        next();
    }
};