const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res) => {
    res.render('admin/login');
};

exports.postLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                req.session.isLoggedIn = true;
                req.session.type = 'admin';
                req.session.userId = user._id;
                res.redirect('/admin/' + user._id + '/dashboard');
            } else {
                req.flash('passwordError', 'Incorrect Password');
                res.redirect('/admin/login');
            }
        } else {
            req.flash('emailError', 'Email not registered');
            res.redirect('/admin/login');
        }
    } catch (err) {
        console.log(err);
    }
};

exports.postSignup = async (req, res) => {
    try {
        const name = req.body.name;
        const rollNo = req.body.rollNo;
        const password = req.body.password;
        const hashed = await bcrypt.hash(password, 12);
        const user = new User({
            type: 'admin',
            name,
            email: req.body.email,
            rollNo,
            password: hashed
        });
        const savedUser = await user.save();
        req.session.isLoggedIn = true;
        req.session.type = 'admin';
        req.session.userId = user._id;
        res.redirect('/' + savedUser._id + '/dashboard');
    } catch (err) {
        console.log(err);
    }
};

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        console.log(err);
    });
    res.redirect('/');

};

exports.getDashboard = (req, res) => {
    res.render('admin/dashboard');
};