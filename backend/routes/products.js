var express = require('express');
var router = express.Router();
const ProductModel = require('../models/ProductModel');
const { addMockData } = require('../helpers/addMockData');

/* /api/products */
router.get('/', async function (req, res, next) {
  const products = await ProductModel.find();
  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json('No products in database')
  }
});



// router.get('/add_mock', (req, res) => {
//   addMockData(res, './PRODUCTS_MOCK_DATA.json', ProductModel);
// });

module.exports = router;


