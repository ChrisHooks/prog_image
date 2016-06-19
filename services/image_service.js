'use-strict'
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const gm = Promise.promisifyAll(require('gm'));

ImageService = {
  doesImageExist: (filename) => {
    let basename = path.basename(filename)
    return fs.existsSync("./public/" + basename);
  },

  checkForOtherFormats: (filename) => {
    let d = Promise.defer();
    fs.readdir('./public', (err, files) => {
      if(err) {
        d.reject(err);
      }

      let splitFilename = path.basename(filename).split(".")
      let file = files.find((file) => {
        return file.split(".")[0] === splitFilename[0];
      })
      if(!!file) {
        d.resolve(path.join(process.cwd(), "./public/" + file), splitFilename[1]);
      } else {
        d.resolve(null);
      }
    })
    return d.promise;
  },

  convertFormat: (filename, format) => {
    var writeStream = fs.createWriteStream(filename.split(".")[0] + '.' + format)
    var convertedImageStream = gm(filename).setFormat(format).stream();
    var d = Promise.defer();
    convertedImageStream.on('finish', () => {
      d.resolve();
    })
    convertedImageStream.pipe(writeStream);
    return d.promise;
  }
};

module.exports = ImageService;
