const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
    balance: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'User'
});

module.exports = User;
