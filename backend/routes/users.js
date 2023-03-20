// const fs = require('fs');
var express = require('express');
var router = express.Router();
const crypto = require('crypto-js');
require('dotenv').config()
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

router.post('/', async (req, res) => {
  const idToFind = req.body.id;
  const foundUser = await UserModel.findById(idToFind);
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(404).json('No user found in database');
  }
});

router.post('/add', async (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  const noBlankFields = checkForBlankFields(userInfo);

  if (noBlankFields) {
    const foundDuplicate = await UserModel.findOne({ email: userInfo.email });
    console.log(foundDuplicate);
    if (!foundDuplicate) {
      // Lägg till salt key i .env
      // Kryptera lösenord
      const pass = crypto.AES.encrypt(userInfo.password, process.env.SALT_KEY).toString();
      console.log(pass);
      res.json('Hej från /add');
    } else {
      res.status(400).json('Email address already exists');
    }
  } else {
    res.status(400).json('Incomplete info, all fields have to be filled');
  }
  // Lägg till i databasen
  // Skicka 201 med success-meddelande
});

module.exports = router;
