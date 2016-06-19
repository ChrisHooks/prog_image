'use-strict'
const fs = require('fs');
const Promise = require('bluebird');
const gm = Promise.promisifyAll(require('gm'));

ImageService = {
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
