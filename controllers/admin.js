const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Section = require('../models/section');

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
        console.log(savedUser);
        req.session.isLoggedIn = true;
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

exports.getDashboard = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('admin/dashboard', {
        pagetitle: 'Admin Dashboard',
        userId: req.params.userId,
        username: user.name
    });
};

exports.getCreateSection = (req, res) => {
    const timings = ['8:30', '9:25', '10:20', '10:40', '11:35', '12:30', '1:25', '1:45', '2:40', '3:35', '4:30', '5:25', '6:20'];
    const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    res.render('admin/create-section', {
        pagetitle: 'Create Section',
        userId: req.params.userId,
        timings
    });
};

exports.postCreateSection = async (req, res) => {
    let i, j;
    let tt = [], timetable = [];
    for (i = 1; i <= 5; i++) {
        tt[i - 1] = [];
        for (j = 1; j <= 12; j++) {
            tt[i - 1][j - 1] = req.body['tt_' + i + '_' + j];
        }
    }
    for (i = 1; i <= 5; i++) {
        timetable[i - 1] = [];
        for (j = 1; j <= 12; j++) {
            if (tt[i - 1][j - 1].trim() === '') {
                timetable[i - 1][j - 1] = null;
            } else {
                const parts = tt[i - 1][j - 1].split(' ');
                const location = parts[0];
                const subCode = parts[1];
                const type = parts[2];
                const teacherCode = parts[3];
                timetable[i - 1][j - 1] = {
                    location,
                    subCode,
                    type,
                    teacherCode: teacherCode,
                    status: 'active'
                }
            }
        }
    }
    let teachers = req.body.teachers.trim().split('/');
    console.log(teachers);
    let teachersAbbr = {};
    for (i = 0; i < teachers.length; i++) {
        const abbr = teachers[i].split(':')[0];
        const fullForm = teachers[i].split(':')[1];
        teachersAbbr[abbr] = fullForm;
    }
    const section = new Section({
        sem: req.body.sem,
        branch: req.body.branch,
        sectionNumber: req.body.sectionNumber,
        timetable,
        notifications: [],
        teachersAbbr
    });

    await section.save();
    req.flash('notification', 'Time table created!');
    res.redirect('/admin/' + req.session.userId + '/dashboard');
}