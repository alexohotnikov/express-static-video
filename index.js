const express = require('express');
const colors = require('colors');
const app = express();


app.use('/public', express.static(__dirname + '/public'));

app.listen(3000, function(){
  console.clear();
  console.log('UCHi.RU S3 is running on Port: 3000.'.green)
});