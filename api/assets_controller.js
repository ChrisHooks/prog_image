'use-strict'
const fs = require('fs');
const path = require('path');
const ImageService = require('../services/image_service.js')

const AssetsController = {
  create: (req, res, next) => {
    let files = []
    req.files.map((file) => {
      if(ImageService.doesImageExist(file.originalname)) {
        return res.status(409).send({error: "Resource all ready exists"})
      }
      file.cdnUrl = './public/' + file.filename + '.jpg';
      fs.createReadStream("./" + file.path).pipe(fs.createWriteStream('./public/' + file.filename + '.jpg'));
      files.push(file)
    })

    res.status(201).send(files);
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
