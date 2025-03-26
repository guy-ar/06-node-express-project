const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();


router.get('/', (req, res, next) => {
  const products = adminData.products;
  //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // need to render the template using the view engine
  // we will pass to the template the products in js object
  res.render('shop', {
    prods: products,
    docTitle: 'Shop',
    path: '/',
    hasProducts: products && products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;
