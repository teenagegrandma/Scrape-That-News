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
var db = 'mongodb://localhost/mongoHeadlines';

//connect to mongoose
mongoose.connect(db, function(err) {
	if(err) {
		console.log(err);
	}
	else {
		console.log('connection successful');
	}
});

var routes = requier('./config/routes.js');

app.use('/', routes):
app.use('/test', routes);
app.use('/fetch', routes);
app.use('/gather', routes);
app.use('/check', routes);
app.use('/save', routes);
app.use('/delete', routes);

//set up port
var port = process.env.PORT || 3000;

//listen on port
app.listen(port, function() {
	console.log('listening on port: ' + port);
});