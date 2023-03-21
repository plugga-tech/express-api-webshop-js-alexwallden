var express = require('express');
const CategoryModel = require('../models/CategoryModel');
var router = express.Router();
const Response = require('../models/ResponseClass');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const categories = await CategoryModel.find();
  console.log(categories);
  if (categories) {
    res
      .status(200)
      .json(new Response(true, `All categories from server`, categories));
  }
});

router.post('/add', async function (req, res, next) {
  const { name, token } = req.body;
  if (token) {
    if (token === process.env.API_KEY) {
      const createdCategory = await CategoryModel.create({
        name,
        products: [],
      });
      console.log(createdCategory);
      if (createdCategory) {
        res
          .status(201)
          .json(
            new Response(
              true,
              `Category ${createdCategory.name} added to database`
            )
          );
      } else {
        // If failed to create category
        res
          .status(500)
          .json(
            new Response(false, `Something went wrong when creating category`)
          );
      }
    } else {
      // If api key is incorrect
      res.status(401).json(new Response(false, 'Wrong API key'));
    }
  } else {
    // If no token
    res
      .status(401)
      .json(new Response(false, 'You need a key to access this endpoint'));
  }
});

module.exports = router;
