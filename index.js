const express = require('express');
const cors = require('cors');
var opn = require('opn');
const colors = require('colors');

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.send('If you see this message => Everythink is OK.<br> <a target = "_blank" href="https://github.com/alexohotnikov/express-static-video">Github page</a>');
})

app.use('/public', express.static(__dirname + '/public'));

app.listen(8000, () => {
  console.clear();
  console.log('👋🏻\tWelcome to Local UCHi.RU Hls-server'.blue)
  console.log('🚀 Server was successful started at 127.0.0.1 with port'.yellow + ' 8000'.green);
  opn('http://127.0.0.1:8000')
})