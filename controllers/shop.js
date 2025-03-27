
const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    // need to render the template using the view engine
    // we will pass to the template the products in js object
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products, 
            docTitle: 'All Products',
            path: '/products'
          });
    });
  }

exports.getIndex = (req, res, next) => {
  // need to render the template using the view engine
  // we will pass to the template the products in js object
  Product.fetchAll(products => {
      res.render('shop/index', {
          prods: products, 
          docTitle: 'Shop',
          path: '/'
        });
  });
  
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        //prods: [],
        docTitle: 'Cart',
        path: '/cart'
    })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
      //prods: [],
      docTitle: 'Checkout',
      path: '/checkout'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
      //prods: [],
      docTitle: 'Orders',
      path: '/orders'
  })
}

exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId, product => {
    console.log(product);
    
    res.render('shop/product-details', {
      product: product,
      docTitle: product.title,
      path: '/products'
    })
  })
  
  
}