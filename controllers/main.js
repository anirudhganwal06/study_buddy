const Section = require('../models/section');

exports.getHome = (req, res) => {
    res.render('main/home', {
        pagetitle: 'Study Buddy',
        isLoggedIn: req.session.isLoggedIn,
        sectionEntered: req.params.sectionId !== undefined,
    });
}

exports.postSectionEntry = async (req, res) => {
    const sem = req.body.sem;
    const branch = req.body.branch;
    const sectionNumber = req.body.sectionNumber;
    const section = await Section.findOne({ sem, branch, sectionNumber });
    if (section) {
        res.redirect('/section/' + section._id + '/dashboard');
    } else {
        req.flash('notFound', 'Section Not Found!');
        console.log('not found');
        res.redirect('/');
    }
};

exports.getSectionSpecificDashboard = async (req, res) => {
    const section = await Section.findById(req.params.sectionId);
    res.render('main/sectionSpecificDashboard', {
        pagetitle: 'Study Buddy',
        isLoggedIn: req.session.isLoggedIn,
        sectionEntered: req.params.sectionId !== undefined,
        sectionId: req.params.sectionId,
        sem: section.sem,
        branch: section.branch,
        sectionNumber: section.sectionNumber
    });
}

exports.getTimetable = async (req, res) => {
    const sectionId = req.params.sectionId;
    const section = await Section.findById(sectionId);
    if (section) {
        const timings = ['8:30', '9:25', '10:20', '10:40', '11:35', '12:30', '1:25', '1:45', '2:40', '3:35', '4:30', '5:25', '6:20'];
        const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const subjectsAbbr = section.subjectsAbbr;
        console.log(req.params.sectionId);
        res.render('main/timetable', {
            pagetitle: 'Study Buddy',
            isLoggedIn: req.session.isLoggedIn,
            sectionId: req.params.sectionId,
            sectionEntered: req.params.sectionId !== undefined,
            timetable: section.timetable,
            subjectsAbbr,
            timings,
            weeks
        });
    } else {
        res.redirect('/');
    }
};