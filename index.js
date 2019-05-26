const express = require('express');
const cors = require('cors');
const colors = require('colors');

const app = express();
app.use(cors());
app.use('/public', express.static(__dirname + '/public'));

app.listen(8000, () => {
  console.clear();
  console.log('UCHi.RU: strated at 127.0.0.1:8000'.blue);
})