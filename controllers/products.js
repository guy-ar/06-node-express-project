
const products = [];
exports.getAppProducts = (req, res, next) => {
    
    res.render('add-product', {
      docTitle: 'Add Product',
      path: '/admin/add-product'
    });
  };

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    products.push({ title: req.body.title });
    console.log(products);
    res.redirect('/');
  };

exports.getProducts = (req, res, next) => {
    // need to render the template using the view engine
    // we will pass to the template the products in js object
    res.render('shop', {
      prods: products,
      docTitle: 'Shop',
      path: '/'
    });
  }