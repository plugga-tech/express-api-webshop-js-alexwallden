const fs = require('fs');
var express = require('express');
var router = express.Router();
require('dotenv').config();
const CryptoJs = require('crypto-js');
const UserModel = require('../models/UserModel');

const checkForBlankFields = (obj) => {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (obj[key] === '') {
        return false;
      }
    }
  }
  return true;
};

/* /api/users */

/* Find and send ALL users */
router.get('/', async function (req, res, next) {
  const usersFromDb = await UserModel.find();
  console.log(usersFromDb);

  if (usersFromDb.length > 0) {
    const usersToSend = usersFromDb.map((user) => {
      const { name, email } = user;
      return { name, email };
    });

    res.status(200).json(usersToSend);
  } else {
    res.status(404).json('No users found in database');
  }
});

/* Find and send ONE user with password */
router.post('/', async (req, res) => {
  const idToFind = req.body.id;
  const foundUser = await UserModel.findById(idToFind);
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(404).json('No user found in database');
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

      res.status(201).json(`Added user ${userInfo.name}`);
    } else {
      // If duplicate is found
      res.status(400).json('Email address already exists');
    }
  } else {
    // If a property value is blank
    res.status(400).json('Incomplete info, all fields have to be filled');
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
      res.status(200).json({ success: true, message: 'Credentials correct' });
    } else {
      // If password is incorrect
      res.status(401).json({ success: false, message: 'Wrong credentials' });
    }
  } else {
    // If email is incorrect
    res.status(401).json({ success: false, message: 'Wrong credentials' });
  }
});

// router.get('/add_mock', (req, res) => {
//   fs.readFile('./MOCK_DATA.json', async (err, data) => {
//     const parsedData = JSON.parse(data);
//     for (let index = 0; index < parsedData.length; index++) {
//       const user = parsedData[index];
//       user.password = CryptoJs.AES.encrypt(
//         user.password,
//         process.env.SALT_KEY
//       ).toString();
//       const addedUser = await UserModel.create(user);
//       console.log(addedUser);
//     }
//   });
//   res.status(200).json('Mock data added!')
// });

module.exports = router;
