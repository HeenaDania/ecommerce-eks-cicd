const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING
  });
};
