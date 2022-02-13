const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/dbConfig');

const User = sequelize.define('User', {
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = User;