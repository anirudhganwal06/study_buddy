const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('./static'));

const adminRoutes = require('./routes/admin');

app.use('/admin', adminRoutes);

const port = 5000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server started @${port}`);
});