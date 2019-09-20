const Section = require('../models/section');

exports.getHome = (req, res) => {
    res.render('main/home');
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
        res.redirect('/');
    }
};

exports.getSectionSpecificDashboard = async (req, res) => {
    const section = await Section.findById(req.params.sectionId);
    res.render('main/sectionSpecificDashboard', {
        sem: section.sem,
        branch: section.branch,
        sectionNumber: section.sectionNumber
    });
}

exports.getTimetable = async (req, res) => {
    const sectionId = req.params.sectionId;
    const section = await Section.findById(sectionId);
    if (section) {
        const subjectsAbbr = section.subjectsAbbr;
        res.render('main/timetable', {
            timetable: section.timetable,
            subjectsAbbr
        });
    } else {
        res.redirect('/');
    }
};