const fs = require('fs');
var express = require('express');
var router = express.Router();
require('dotenv').config();
const CryptoJs = require('crypto-js');
const UserModel = require('../models/UserModel');
const Response = require('../models/ResponseClass');
const {
  addMockData,
  checkForBlankFields,
} = require('../common/helperFunctions');

/* /api/users */

/* Find and send ALL users */
router.get('/', async function (req, res, next) {
  console.log(req.params);
  const usersFromDb = await UserModel.find();
  console.log(usersFromDb);

  if (usersFromDb.length > 0) {
    const usersToSend = usersFromDb.map((user) => {
      const { name, email, _id } = user;
      return { name, email, id: _id };
    });

    res
      .status(200)
      .json(new Response(true, 'Found users in database', usersToSend));
  } else {
    res.status(404).json(new Response(false, 'No users found in database'));
  }
});

/* Find and send ONE user with password */
router.post('/', async (req, res) => {
  const idToFind = req.body.id;
  if (idToFind.length === 24) {
    const foundUser = await UserModel.findById(idToFind);
    if (foundUser) {
      res.status(200).json(new Response(true, 'User found', foundUser));
    } else {
      // If user not found
      res
        .status(404)
        .json(
          new Response(false, `No user with ID ${idToFind} found in database`)
        );
    }
  } else {
    res.status(404).json(new Response(false, 'Wrong format on ID'));
  }
});

/* Add one user */
router.post('/add', async (req, res) => {
  const userInfo = { ...req.body };
  console.log(userInfo);
  const noBlankFields = checkForBlankFields(userInfo);

  if (noBlankFields) {
    const foundDuplicate = await UserModel.findOne({ email: userInfo.email });
    if (!foundDuplicate) {
      userInfo.password = CryptoJs.AES.encrypt(
        userInfo.password,
        process.env.SALT_KEY
      ).toString();
      await UserModel.create(userInfo);

      res.status(201).json(new Response(true, `Added user ${userInfo.name}`));
    } else {
      // If duplicate is found
      res.status(400).json(new Response(false, 'Email address already exists'));
    }
  } else {
    // If a property value is blank
    res
      .status(400)
      .json(
        new Response(false, 'Incomplete info, all fields have to be filled')
      );
  }
});

/* Login user */
router.post('/login', async (req, res) => {
  const userInfo = req.body;
  const encryptedPassword = CryptoJs.AES.encrypt(
    userInfo.password,
    process.env.SALT_KEY
  ).toString();
  const foundUser = await UserModel.findOne({ email: userInfo.email });
  if (foundUser) {
    const decryptedPassword = CryptoJs.AES.decrypt(
      foundUser.password,
      process.env.SALT_KEY
    ).toString(CryptoJs.enc.Utf8);
    if (decryptedPassword === userInfo.password) {
      res.status(200).json(new Response(true, 'Credentials correct'));
    } else {
      // If password is incorrect
      res.status(401).json(new Response(false, 'Wrong credentials'));
    }
  } else {
    // If email is incorrect
    res.status(401).json(new Response(false, 'Wrong credentials'));
  }
});

// router.get('/add_mock', (req, res) => {
//   addMockData(res, './USERS_MOCK_DATA.json', UserModel, true);
// });

module.exports = router;
