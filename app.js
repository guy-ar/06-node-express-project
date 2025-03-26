const path = require('path');

const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
app.engine('handlebars', engine({
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  defaultLayout: 'main-layout',
  extname: 'handlebars'}));

// express will support pug as view engine when we wil use the function for dynamic templates
// express do nt support handles bar and need additial configuration for using it

//app.set('view engine', 'pug');
app.set('view engine', 'handlebars');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {
      docTitle: 'Error Page',
    });
});

app.listen(3000);
