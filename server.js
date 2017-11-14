//dependencies
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));

//conect handlebars
app.engine('handlebars', expressHandlebars({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//use bodyparser
app.use(bodyParser.urlencoded({
	extended: false
}));

//mongo db directory
var db = 'mongodb://heroku_6bcvrt0m:7ttugr15dk2s9439ulau4mpmhc@ds157325.mlab.com:57325/heroku_6bcvrt0m';

//connect to mongoose
mongoose.connect(db, function(err) {
	if(err) {
		console.log(err);
	}
	else {
		console.log('connection successful');
	}
});

var routes = require('./config/routes.js');

app.use('/', routes);
app.use('/test', routes);
app.use('/fetch', routes);
app.use('/gather', routes);
app.use('/check', routes);
app.use('/save', routes);
app.use('/delete', routes);

//set up port
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_6bcvrt0m:7ttugr15dk2s9439ulau4mpmhc@ds157325.mlab.com:57325/heroku_6bcvrt0m";

//listen on port
app.listen(port, function() {
	console.log('listening on port: ' + port);
});