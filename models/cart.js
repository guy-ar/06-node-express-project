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
            const currentTotal = Number(cart.totalPrice);
            const numericPrice = Number(productPrice);

            // Calculate and round to 2 decimal places
            cart.totalPrice = Number((currentTotal + numericPrice).toFixed(2));
            // save updated cart
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
    }

    static deleteItem(productId, productPrice) {
        // fetch existing cart
        const fileContent = fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const product = cart.items.find(prod => prod.id === productId);
            if (!product) {
                return;
            }
            const updatedCartItems = cart.items.filter(prod => prod.id !== productId);
            const calculatedSubtotal = +productPrice * product.quantity;
            // Subtract and round to 2 decimal places
            cart.totalPrice = +(cart.totalPrice - calculatedSubtotal).toFixed(2);
            cart.items = updatedCartItems;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}