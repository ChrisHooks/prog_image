'use-strict'

const ProgImage = require('./index.js');
const multer = require('multer');
const express = require('express');
global.app = express();
const upload = multer({ dest: './uploads/'});

app.use('/public', ProgImage.AssetsController.showImage, express.static('public'));
app.get('/status', ProgImage.StatusController.show);
app.post('/assets', upload.single('file'), ProgImage.AssetsController.create);

app.port = 3000;
app.hostname = '127.0.0.1'
app.host = 'http://' + app.hostname + ':' + '3000';

app.listen(app.port, app.hostname, () => {
  console.log('listening on ' + app.port);
});

