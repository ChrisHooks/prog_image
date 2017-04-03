'use-strict'

const ProgImage = require('./index.js');
const multer = require('multer');
const express = require('express');
global.app = express();
const upload = multer({ dest: './uploads/'});

app.use('/public', ProgImage.AssetsController.showImage, express.static('public'));
app.get('/status', ProgImage.StatusController.show);
app.post('/assets', upload.any(), ProgImage.AssetsController.create);

app.port = process.env.PORT || 3000;

app.listen(app.port, () => {
  console.log('listening on ' + app.port);
});

