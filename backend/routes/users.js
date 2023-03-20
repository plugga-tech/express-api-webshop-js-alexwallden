var express = require('express');
var router = express.Router();
const fs = require('fs');
const UserModel = require('../models/UserModel');

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
    res.status(404).json('No users found in database')
  }
});

module.exports = router;
