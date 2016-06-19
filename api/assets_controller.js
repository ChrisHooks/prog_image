'use-strict'
const fs = require('fs');

const AssetsController = {
  create: (req, res, next) => {
    fs.createReadStream("./" + req.file.path).pipe(fs.createWriteStream('./public/' + req.file.originalname));
    res.status(201).send({path: "/public/image.jpg"});
  },
  showImage: (req, res, next) => {
    console.log(req.path);
    next();
  }
}

module.exports = AssetsController;
