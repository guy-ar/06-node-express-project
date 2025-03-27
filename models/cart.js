const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const e = require('express');

const p = path.join(rootDir, 'data', 'cart.json');



module.exports = class Cart {
    // private items: CartItem[] = [];
    // private totalQuantity: number = 0;
    static addItem(productId, productPrice) {
        // fetch existing cart
        const fileContent = fs.readFile(p, (err, fileContent) => {
            let cart = {items: [], totalPrice: 0};
            if (!err) {
              cart = JSON.parse(fileContent);
            }
            // analyze and check if item exists
            const existingProduct = cart.items.find(prod => prod.id === productId);
            let updatedProduct;
            // add new item to cart/ or update totalQuantity
            if (existingProduct){
                // need to increase totalQuantity
                updatedProduct = {...existingProduct};
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.items = cart.items.map(prod => {
                    if (prod.id === productId) {
                        // in case of current product - return updated with increased quantity
                        return updatedProduct;
                    } else {
                        return prod;
                    }
                });
            } else {
                updatedProduct = {id: productId, quantity: 1};
                cart.items = [...cart.items, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            // save updated cart
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
    }
}