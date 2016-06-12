var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( { extended:false } );
var equation = require('../modules/equation.js');

var server = app.listen('8080', function(){
  console.log('8080 is listening!');
});

app.get('/', function(req, res){
  res.sendFile(path.resolve('views/index.html'));
});

app.post('/equate', urlencodedParser, function(req, res){
  console.log('x: ' + req.body.x + '  y: ' + req.body.y + '  operation: ' + req.body.operation);
  //creating equate variable that will be changed by the switch function
  var equate;
  //switch function to decide which mathematical operation to used based on req.body.operation value
  switch(req.body.operation){
    case '+':
      equate = Number(req.body.x) + Number(req.body.y);
      break;
    case '-':
      equate = Number(req.body.x) - Number(req.body.y);
      break;
    case '/':
      equate = Number(req.body.x) / Number(req.body.y);
      break;
    case '*':
      equate = Number(req.body.x) * Number(req.body.y);
      break;
    default:
      console.log('switch function fail');
  }
  //change equate to a string then send back to client side
  var returnString = equate.toString();
  res.send(returnString);
});

app.use(express.static('public'));
