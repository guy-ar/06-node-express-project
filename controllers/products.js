
const Product = require('../models/product');
exports.getAppProducts = (req, res, next) => {
    
    res.render('add-product', {
      docTitle: 'Add Product',
      path: '/admin/add-product'
    });
  };

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    
    res.redirect('/');
  };

exports.getProducts = (req, res, next) => {
    // need to render the template using the view engine
    // we will pass to the template the products in js object
    const products = Product.fetchAll();
    res.render('shop', {
      prods: products, 
      docTitle: 'Shop',
      path: '/'
    });
  }