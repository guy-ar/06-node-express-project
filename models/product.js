
const Cart = require('./cart');


const db = require('../util/database');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }


  insert() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)', [this.title, this.price, this.imageUrl, this.description]);
  }

  update() {
    return db.execute('UPDATE products SET title = ?, price =?, imageUrl = ?, description = ? WHERE id = ?', [this.title, this.price, this.imageUrl, this.description, this.id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
  }

  static findById(id, cb) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
}