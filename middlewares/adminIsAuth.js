module.exports = (req, res, next) => {
    if (req.session.isLoggedIn === true && req.session.userId == req.params.userId && req.session.type === 'admin') {
        next();
    } else {
        res.redirect('/admin/login');
    }
};