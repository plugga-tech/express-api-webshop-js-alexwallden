var express = require('express');
var router = express.Router();
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const { addMockData } = require('../common/helperFunctions');
const Response = require('../models/ResponseClass');

/* /api/products */
router.get('/:id?', async function (req, res, next) {
  console.log(req.params.id);
  if (req.params.id) {
    console.log(req.params.id.length);
    if (req.params.id.length === 24) {
      const foundProduct = await ProductModel.findById(req.params.id);
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
    // If no params
    const products = await ProductModel.find();
    if (products.length > 0) {
      res
        .status(200)
        .json(new Response(true, 'All products in database', products));
    } else {
      // If no products in db
      res.status(404).json(new Response(false, 'No products in database'));
    }
  }
});

router.post('/add', async (req, res) => {
  const { name, description, price, lager, category, token } = req.body;
  if (token === process.env.API_KEY) {
    if (category.length === 24) {
      const createdProduct = await ProductModel.create({
        name,
        description,
        price,
        lager,
        category,
      });
      const addedToCategory = await CategoryModel.findByIdAndUpdate(category, {
        $push: { products: createdProduct._id },
      });
      if (addedToCategory) {
        console.log(addedToCategory);
        res.status(200).json(new Response(true, `Added ${name} to database`));
      } else {
        await ProductModel.findByIdAndDelete(createdProduct._id);
        res.status(404).json(new Response(false, `No category found for id ${category}. ${name} not added`))
      }
    } else {
      res.status(400).json(new Response(false, 'Wrong format for category id'))
    }
  } else {
    res.status(401).json(new Response(false, 'Wrong API key'));
  }
});

router.get('/category/:id', async (req, res) => {
  const id = req.params.id;
  if (id.length === 24) {
    const category = await CategoryModel.findById(id);
    if (category) {
      const products = await ProductModel.find({
        _id: { $in: category.products },
      });
      console.log(products);
      res
        .status(200)
        .json(
          new Response(
            true,
            `Found products in category ${category.name}`,
            products
          )
        );
    } else {
      res
        .status(404)
        .json(new Response(false, `No category found for id ${id}`));
    }
  } else {
    res.status(404).json(new Response(false, 'Wrong format on id'));
  }
});

// router.get('/add_mock', (req, res) => {
//   addMockData(res, './PRODUCTS_MOCK_DATA.json', ProductModel);
// });

module.exports = router;
