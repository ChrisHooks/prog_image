'use-strict'
const fs = require('fs');
const path = require('path');
const ImageService = require('../services/image_service.js')

const AssetsController = {
  create: (req, res, next) => {
    fs.createReadStream("./" + req.file.path).pipe(fs.createWriteStream('./public/' + req.file.originalname));
    res.status(201).send({path: "/public/image.jpg"});
  },
  showImage: (req, res, next) => {
    if (fs.existsSync("./public" + req.path)) {
      next();
      return;
    }

    fs.readdir('./public', (err, files) => {
      if(err) {
        res.status(500).send({ error: err });
      }

      let splitFilename = req.path.replace("/", "").split(".")
      let file = files.find((file) => {
        return file.split(".")[0] === splitFilename[0]
      })
      if(!!file) {
        ImageService.convertFormat(path.join(process.cwd(), "./public/" + file), splitFilename[1])
        .then((image) => {
          next();
        })
        .catch((e) => {
          res.status(500).send(e)
        })
      } else {
        next();
      }
    })
  }
}

module.exports = AssetsController;
