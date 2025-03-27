const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
//const products = [];
const p = path.join(rootDir, 'data', 'products.json');

const readDataFromFile = cb => {
    const fileContent = fs.readFile(p, (err, fileContent) => {
        if (err) {
          return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
}
module.exports = class Product {
    constructor(title, imageUrl, description, price) {
      this.title = title;
      this.imageUrl = imageUrl;
      this.description = description;
      this.price = price;
    }

    save() {
      this.id = Math.random().toString();
        readDataFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        })
    }

    static fetchAll(cb) {
      readDataFromFile(cb);
    }

    static findById(id, cb) {
      readDataFromFile(products => {
        const product = products.find(p => p.id === id);
        cb(product);
      });
    }
}