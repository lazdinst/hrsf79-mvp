var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var mongoHelper = require('../database-mongo');

var app = express();
var port = 1337;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/forests', function (req, res) {
  console.log('SERVER: Getting Forests')
  mongoHelper.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.post('/forests', function (req, res, next) {
  console.log('SERVER: Posting new Forest')
  console.log(req.body);
  mongoHelper.saveNewForest(req.body)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err);
    });
});


// app.post('/forests', function (req, res, next) {
//   console.log('SERVER: Posting new Forest')
//   console.log(req.body);
//   mongoHelper.saveNewForest(req.body, function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       console.log(data);
//       res.json(data);
//     }
//   })
// });

// app.get('/camps', function(req, res) {
//   res.send('helo from the camps page')
// })

app.listen(port, function() {
  console.log('listening on port ' + port + '!');
});