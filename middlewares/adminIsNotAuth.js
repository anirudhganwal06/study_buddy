module.exports = (req, res, next) => {
    if (req.session.isLoggedIn === true) {
        res.redirect('/admin/' + req.session.userId + '/dashboard');
    } else {
        next();
    }
};