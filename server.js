
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , doctor = require('./routes/doctor')
  , patient = require('./routes/patient')
  , http = require('http')
  , path = require('path');

var app = express();

var Patient = require('./models/patient');

app.configure(function(){
  //app.set('port', process.env.PORT || 3000);
  app.set('port',process.env.OPENSHIFT_NODEJS_PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var mongoose   = require('mongoose');
mongoose.connect('mongodb://healthwithyou:healthwithyou@linus.mongohq.com:10048/healthwithyou'); // connect to our database
//mongoose.connect('mongodb://localhost:27017/healthwithyou'); // connect to our database

app.get('/', routes.index);
app.get('/doctors', doctor.list);//doctors=doctors
app.get('/patients', patient.list);
app.get('/patient/:patient_id', patient.find);
app.post('/patient', patient.create);

app.post('/measure/:patient_id', patient.postMeasure);

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
*/
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
/*
app.listen(port, ipaddress,function(){
  console.log((new Date())+"Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
*/
http.createServer(app).listen(port, ipaddress,function(){
  console.log("Express server listening on port ");
});

