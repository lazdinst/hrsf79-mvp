var mongoose = require('mongoose');
var exampleData = require('../lib/data/forestExampleData.js');
mongoose.connect('mongodb://localhost/dispersed');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

//Define forestSchema
var forestSchema = mongoose.Schema({
  name: { type: String, unique: true },
  image: String,
  description: String,
  usfs: String
});

var Forest = mongoose.model('Forest', forestSchema);

//ADD EXAMPLE DATA TO MONGO
// var forests = exampleData.forests;
// forests.forEach((forest)=>{
//   Forest.create(forest, function (err, forest) {
//     if (err) {
//       console.log('ERROR: Not added to database', err);
//     } else {
//       console.log('SUCCESS: ' + forest + ' added to Database');
//     }
//   });
// })

var saveNewForest = function(forest) {
  return Forest.create(forest)
    .then((forest) => {
      console.log('SUCCESS: ' + forest.name + ' added to Database');
      return forest;
    })
};

var findAll = function(callback) {
  return Forest.find()
    .exec();
};

module.exports.findAll = findAll;
module.exports.saveNewForest = saveNewForest;



















