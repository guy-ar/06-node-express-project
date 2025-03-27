const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Cart = require('./cart');
const p = path.join(rootDir, 'data', 'products.json');

const readDataFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
          cb([]);
        } else {
          cb(JSON.parse(fileContent));
        }
    });
}
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }


  save() {
    readDataFromFile(products => {
      if (this.id) {
        // this is existing product - need to update it
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const productsToSave = [...products];
        console.log(productsToSave);
        productsToSave[existingProductIndex]=this;
        console.log(productsToSave);
        fs.writeFile(p, JSON.stringify(productsToSave), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
        });
      }
    })
  }

    static fetchAll(cb) {
      readDataFromFile(cb);
    }

    static deleteById(id) {
      readDataFromFile(products => {
      if (id) {
        const productToDelete = products.find(prod => prod.id === id);
        const productPrice = productToDelete.price;
        const productsToSave = products.filter(prod => prod.id !== id);
        console.log(productsToSave);
        fs.writeFile(p, JSON.stringify(productsToSave), err => {
          if (!err) {
            Cart.deleteItem(id, productPrice);
          }
        });
      }
    })
    }

    static findById(id, cb) {
      readDataFromFile(products => {
        const product = products.find(p => p.id === id);
        cb(product);
      });
    }
}