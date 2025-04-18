const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    // for later use
    // password: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    // isAdmin: {
    //     type: Sequelize.BOOLEAN,
    //     allowNull: false,
    //     defaultValue: false
    // }
});

module.exports = User; 