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
    const product = new Product(null, title, imageUrl, description, price);
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

  exports.postEditProducts = (req, res, next) => {
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const updatedProdId = req.body.productId;
    // create the product to update
    const updatedProduct = new Product(updatedProdId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    console.log(updatedProduct);
      
    // save the updated product
    updatedProduct.save();
      
    res.redirect('/admin/products');
  };

  exports.postDeleteProducts = (req, res, next) => {
    const prodIdToDelete = req.body.productId;
    console.log(prodIdToDelete);
    Product.deleteById(prodIdToDelete);
      
    res.redirect('/admin/products');
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