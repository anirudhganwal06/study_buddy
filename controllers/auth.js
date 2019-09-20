const bcrypt = require('bcryptjs');

const User = require('../models/user');

// exports.getSignup**********************************************************************************

exports.postSignup = async (req, res) => {
    try {
        const type = req.body.type;
        if (type == 'student') {
            const name = req.body.name;
            const rollNo = req.body.rollNo;
            const email = req.body.email;
            const password = req.body.password;
            const section = {
                sem: req.body.sem,
                branch: req.body.branch,
                sectionNumber: req.body.sectionNumber
            }
            const user = await User.findOne({ email: email });
            if (user) {
                req.flash('emailError', 'Email Id already registered');
                res.redirect('/signup');
            } else {
                const hashed = await bcrypt.hash(password, 12);
                const newUser = new User({
                    type,
                    name,
                    rollNo,
                    email,
                    hashed,
                    section
                });
                const createdUser = await newUser.save();
                req.session.isLoggedIn = true;
                req.session.type = type;
                req.session.userId = createdUser._id;
                res.redirect('/user/' + createdUser._id + '/dashboard');
            }
        } else {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({ email: email });
            if (user) {
                req.flash('emailError', 'Email Id already registered');
                res.redirect('/signup');
            } else {
                const hashed = await bcrypt.hash(password, 12);
                const newUser = new User({
                    type,
                    name,
                    email,
                    hashed,
                });
                const createdUser = await newUser.save();
                req.session.isLoggedIn = true;
                req.session.type = type;
                req.session.userId = createdUser._id;
                res.redirect('/user/' + createdUser._id + '/dashboard');
            }
        }
    } catch (err) {
        console.log(err);
    }
};

// exports.getLogin*******************************************************************************

exports.postLogin = async (req, res) => {
    try {
        const type = req.body.type;
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                req.session.isLoggedIn = true;
                req.session.type = type;
                req.session.userId = user._id;
                res.redirect('/' + user._id + '/dashboard');
            } else {
                req.flash('passwordError', 'Incorrect password')
                res.redirect('/login');
            }
        } else {
            req.flash('emailError', 'Email not registered')
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
    }
};

exports.postLogout = (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}