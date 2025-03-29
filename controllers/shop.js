
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
  req.user.getCart()
  .then(cart => {
    console.log(cart);
    return cart.getProducts();
  })
  .then(products => {
    
    res.render('shop/cart', {
      //prods: [],
      docTitle: 'Cart',
      path: '/cart',
      products: products
    })
  })
  .catch(
    err => {
        console.log(err);
    }
  );
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart; // will be populated and used later on
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      // need to return the product that belongs to the cart and have the productId
      fetchedCart = cart;
      return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
    
      let product;
      if (products.length > 0) {
        // if the product is already in the cart we will increase the quantity by 1
        product = products[0];
      }


      if (product) {
        newQuantity = product.cartItem.quantity + 1;
        // product is part of cart - quantity was suppose to be updated
        return product;
      }
      // if the product is not in the cart
      return Product.findByPk(prodId);
    })
    // in both cases we return product
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: {quantity: newQuantity}
      })
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));  
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