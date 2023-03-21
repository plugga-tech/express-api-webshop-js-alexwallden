var express = require('express');
const OrderModel = require('../models/OrderModel');
var router = express.Router();

/* GET users listing. */

router.post('/add', async (req, res) => {
  const order = req.body;
  console.log(order);
  const createdOrder = await OrderModel.create(order)
  console.log(createdOrder);
  res.json('Order skapad')
})

router.get('/all', async function(req, res, next) {
  const orders = await OrderModel.find();
  console.log(orders);
  res.status(200).json(orders)
});

module.exports = router;
