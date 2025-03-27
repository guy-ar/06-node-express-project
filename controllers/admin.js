const Product = require('../models/product');
exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
      docTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      buttonCaption: 'Add Product',
    });
  };

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    
    res.redirect('/');
  };
  exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
      if (!product) {
        // better to move to error page - but for now we will redirect
        return res.redirect('/');
      }
      console.log(product);
      console.log(editMode);
      res.render('admin/edit-product', {
        docTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        buttonCaption: 'Update Product',
        product: product
      });
    })
    
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