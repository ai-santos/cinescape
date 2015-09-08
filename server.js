// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    parseString = require('xml2js').parseString,
    request = require('request')

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/cinephile'
);
// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//API ROUTES
//imdb API
// app.get('/api/movie', function (req, res) {
//   var title = req.body.title;
//   request('http://www.omdbapi.com/?type=movie&tomatoes=true&plot=full&t=' + title, function (error, response, body) {
//     res.json(body);
//   });
// });

//trailer addict API
app.post('/api/movietrailers', function (req, res) {
  var trailer = req.body.trailer;
  request('http://api.traileraddict.com/?count=10&film=' + trailer, function (error, response, body) {
    var xml = body;
    parseString(xml, function (err, result) {
      res.json(result);
    });
  });
});

//STATIC ROUTES
// set location for static files
app.use(express.static(__dirname + '/public'));

// load public/index.html file (angular app)
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});
