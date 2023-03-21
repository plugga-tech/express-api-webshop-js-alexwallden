const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const CategoryModel = mongoose.Schema({
  name: String,
  products: [ObjectId],
});

module.exports = mongoose.model('category', CategoryModel, 'categories');
