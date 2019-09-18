const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

const app = express();

dotenv.config();
app.use(flash());
const mongoURI = process.env.mongoURI;

const sessionStore = new mongoDBStore({
    uri: mongoURI,
    collection: 'sessions'
});

app.use(session({
    store: sessionStore,
    secret: 'hahaha',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('./static'));
app.use(bodyParser.urlencoded({ extended: false }));

const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.use(mainRoutes);
app.use(authRoutes);
app.use('/admin', adminRoutes);

const port = 5000 || process.env.PORT;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started @${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });