const path = require('path');

const express = require('express');
const sequelize = require('./util/database');

const app = express();

// express will support ejs as view engine when we wil use the function for dynamic templates
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const e = require('express');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getErrorPage);

// insure that all models are synced with the database - if no tables exist they will be created
sequelize
    .sync()
    .then(result => {
        //console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });