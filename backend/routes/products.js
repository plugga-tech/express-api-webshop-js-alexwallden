var express = require('express');
var router = express.Router();
const ProductModel = require('../models/ProductModel');
const { addMockData } = require('../helpers/addMockData');
const Response = require('../models/ResponseClass');

/* /api/products */
router.get('/', async function (req, res, next) {
  if (req.query.id) {
    console.log(req.query.id.length);
    if (req.query.id.length === 24) {
      const foundProduct = await ProductModel.findById(req.query.id);
      if (foundProduct) {
        res.status(200).json(new Response(true, 'Found product', foundProduct));
      } else {
        // If product is not found
        res.status(404).json(new Response(false, 'Product not found'));
      }
    } else {
      // If req id is not 24 characters
      res.status(400).json(new Response(false, 'Wrong format on id'));
    }
  } else {
    // If no query params
    const products = await ProductModel.find();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      // If no products in db
      res.status(404).json(new Response(false, 'No products in database'));
    }
  }
});

router.post('/add', async (req, res) => {
  // skapa en ny produkt och skicka response
  const createdProduct = await ProductModel.create(req.body);
  console.log(createdProduct);
  if (createdProduct) {
    res
      .status(201)
      .json(
        new Response(
          true,
          `${createdProduct.name} created successfully`,
          createdProduct
        )
      );
  } else {
    res.status(500).json(new Response(false, 'Somthing went wrong'));
  }
});

// router.get('/:id', async (req, res) => {
//   console.log('Hej från /');
//   // Om det finns ett id, hitta produkten
//   if (req.params.id) {
//     const foundProduct = await ProductModel.findById(req.params.id);
//     if (foundProduct) {
//       res.status(200).json(new Response(true, 'Found product', foundProduct));
//     } else {
//       res.status(404).json('Product not found');
//     }
//   }
// });

// router.get('/add_mock', (req, res) => {
//   addMockData(res, './PRODUCTS_MOCK_DATA.json', ProductModel);
// });

module.exports = router;
