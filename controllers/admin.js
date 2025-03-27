const Product = require('../models/product');
exports.getAddProducts = (req, res, next) => {
    
    res.render('admin/add-product', {
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
Product.fetchAll(products => {
    res.render('admin/products', {
        prods: products, 
        docTitle: 'Admin Products',
        path: '/admin/products'
        });
    });

}