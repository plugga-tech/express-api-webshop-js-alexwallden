var express = require('express');
const OrderModel = require('../models/OrderModel');
var router = express.Router();
const Response = require('../models/ResponseClass');
const ProductModel = require('../models/ProductModel');
const UserModel = require('../models/UserModel');

/* GET users listing. */

router.post('/add', async (req, res) => {
  const order = req.body;
  console.log('orderBLBLBLBA: ', order);
  const foundUser = await UserModel.findById(order.user);
  console.log(foundUser);
  if (foundUser) {
    for (let index = 0; index < order.products.length; index++) {
      const { productId, quantity } = order.products[index];
      const decreasedAmountResponse = await ProductModel.findByIdAndUpdate(
        productId,
        { $inc: { lager: -quantity } }
      );
      console.log('!!!!!', decreasedAmountResponse);
    }

    const createdOrder = await OrderModel.create(order);
    console.log(createdOrder);
    res.status(201).json(new Response(true, 'Order created', createdOrder));
  } else {
    res.status(404).json(new Response(false, 'No matching user in database'));
  }
});

router.get('/all/:key?', async function (req, res, next) {
  if (req.params.key) {
    if (req.params.key === process.env.API_KEY) {
      const orders = await OrderModel.find();
      console.log(orders);
      res
        .status(200)
        .json(new Response(true, 'All orders in database', orders));
    } else {
      // If wrong key
      res.status(401).json(new Response(false, 'Wrong API key'));
    }
  } else {
    // If no key
    res
      .status(401)
      .json(new Response(false, 'You need a key to access this endpoint'));
  }
});

router.post('/user', async (req, res) => {
  if (req.body.token) {
    if (req.body.token === process.env.API_KEY) {
      const orders = await OrderModel.find({ user: req.body.user });
      const separateOrders = [];
      for (let index = 0; index < orders.length; index++) {
        const order = orders[index];
        separateOrders.push(order);
      }
      console.log(separateOrders);
      const ordersWithProducts = [];
      for (let index = 0; index < separateOrders.length; index++) {
        const order = separateOrders[index];
        const orderToPush = { id: order._id, products: [] };
        for (let index = 0; index < order.products.length; index++) {
          const product = order.products[index];
          const productFromDb = await ProductModel.findById(product.productId);
          if (productFromDb) {
            const { _id, name, description, price } = productFromDb;
            const productToPush = {
              _id,
              name,
              description,
              price,
              quantity: product.quantity,
            };
            console.log(productToPush);
            orderToPush.products.push(productToPush);
          }
        }
        ordersWithProducts.push(orderToPush);
      }
      console.log(ordersWithProducts);

      res
        .status(200)
        .json(
          new Response(
            true,
            `All orders for user ${req.body.user}`,
            ordersWithProducts
          )
        );
    } else {
      // If wrong key
      res.status(401).json(new Response(false, 'Wrong API key'));
    }
  } else {
    // If no key
    res
      .status(401)
      .json(new Response(false, 'You need a key to access this endpoint'));
  }
});

module.exports = router;
