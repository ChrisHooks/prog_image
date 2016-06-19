'use-strict'

const ProgImage = require('./index.js');
global.app = require('express')();

app.get('/status', ProgImage.StatusController.show)

app.port = 3000;
app.hostname = '127.0.0.1'
app.host = 'http://' + app.hostname + ':' + '3000';
app.listen(app.port, app.hostname, () => {
  console.log('listening on ' + app.port);
});

