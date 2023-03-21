const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const OrderModel = mongoose.Schema({
  user: ObjectId,
  products: [
    {
      productId: String,
      quantity: Number
    }
  ],
});

module.exports = mongoose.model('order', OrderModel, 'orders');
