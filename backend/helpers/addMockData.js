const fs = require('fs')
const addMockData = (res, filePath, Model, encryptPassword) => {
  fs.readFile(filePath, async (err, data) => {
    console.log('DATA:');
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    for (let index = 0; index < parsedData.length; index++) {
      const element = parsedData[index];
      if (encryptPassword) {
        element.password = CryptoJs.AES.encrypt(
          element.password,
          process.env.SALT_KEY
        ).toString();
      }
      const addedElement = await Model.create(element);
      console.log(addedElement);
    }
  });
  res.status(200).json('Mock data added!');
};

module.exports = { addMockData };
