'use-strict'
const fs = require('fs');
const path = require('path');
const ImageService = require('../services/image_service.js')

const AssetsController = {
  create: (req, res, next) => {
    if(ImageService.doesImageExist(req.file.originalname)) {
      return res.status(409).send({error: "Resource all ready exists"})
    }
    fs.createReadStream("./" + req.file.path).pipe(fs.createWriteStream('./public/' + req.file.originalname));
    res.status(201).send({path: "/public/image.jpg"});
  },

  showImage: (req, res, next) => {
    if(ImageService.doesImageExist(req.path)) {
      return next();
    }

    ImageService.checkForOtherFormats(req.path)
    .then((filename) => {
      if(!!filename) {
        let splitFilename = req.path.replace("/", "").split(".");
        return ImageService.convertFormat(filename, splitFilename[1]);
      }
    })
    .then(() => {
      next();
    })
    .catch((e) => {
      res.status(500).send(e)
    })
  }
}

module.exports = AssetsController;
