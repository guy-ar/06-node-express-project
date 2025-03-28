
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    // need to render the template using the view engine
    // we will pass to the template the products in js object
    Product.findAll()
    .then(products => {
        res.render('shop/product-list', {
            prods: products, 
            docTitle: 'All Products',
            path: '/products'
          });
      })
      .catch(
      err => {
          console.log(err);
      }
    );
  }

exports.getIndex = (req, res, next) => {
  // need to render the template using the view engine
  // we will pass to the template the products in js object
  Product.findAll()
  .then(products => {
      res.render('shop/index', {
          prods: products, 
          docTitle: 'Shop',
          path: '/'
        });
  })
  .catch(
    err => {
        console.log(err);
    }
  );
  
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.findAll()
    .then(products => {
        const cartProducts = [];
        for (product of products) {
          const cartProductData = cart.items.find(prod => prod.id === product.id);
          if (cartProductData) {
            cartProducts.push({productData: product, qty: cartProductData.quantity});
          }
        }
        res.render('shop/cart', {
          //prods: [],
          docTitle: 'Cart',
          path: '/cart',
          products: cartProducts
        })
      })
      .catch(
        err => {
            console.log(err);
        }
      );
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findByPk(prodId).then(product => {
    Cart.addItem(prodId, product.price);
    res.redirect('/cart');
  }).catch(err => console.log(err));
}

exports.postCartDeleteProduct= (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then((product) => {
    Cart.deleteItem(prodId, product.price);
    res.redirect('/cart');
  }).catch(err => console.log(err));
  
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
  Product.findByPk(prodId).then(product => {
    console.log(product);
    res.render('shop/product-details', {
      product: product,
      docTitle: product.title,
      path: '/products'
    })
  }).catch(err => console.log(err));  
}