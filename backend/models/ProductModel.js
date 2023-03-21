const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const ProductModel = mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    lager: Number,
    category: ObjectId
  }
);

module.exports = mongoose.model('product', ProductModel, 'products');