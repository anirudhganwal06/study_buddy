const bcrypt = require('bcryptjs');

const User = require('../models/user');

// exports.getSignup**********************************************************************************

exports.postSignup = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const hashed = await bcrypt.hash(password, 12);
        const user = require
        res.redirect('/' + userRef.id + '/dashboard');
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
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.json({ msg: "signup success" });
                res.redirect('/' + userId + '/dashboard');
            } else {
                res.json({ msg: "Incorrect password" });
            }
        } else {
            res.json({ msg: "User not found" });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.postLogout = (req, res) => {
    try {
    } catch (err) {
        console.log(err);
    }
}