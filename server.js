'use strict';

//dependencies
const express = require('express'),
	mongoose = require('mongoose'),
	exphbs = require('express-handlebars'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;

var app = express();

//use express
app.use(express.static(__dirname + '/public'));

//connect handlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//use methodOverride
app.use(methodOverride('_method'));

//use logger
app.use(logger('dev'));

//controllers
app.use(require('./controllers'));

//configure server
mongoose.Promise = Promise;

const dbURI = process.env.MONGODB_URI || "mongodb://heroku_6bcvrt0m:7ttugr15dk2s9439ulau4mpmhc@ds157325.mlab.com:57325/heroku_6bcvrt0m";

//database config with mongoose
mongoose.connect(dbURI);

const db = mongoose.connection;

//show errors with mongoose
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

//log message if successfully in db through mongoose
db.once("open", function() {
	console.log("Successful");
	//start server, listen on port 3000
	app.listen(PORT, function() {
		console.log("App running on port" + PORT);
	});
});

//export
module.exports = app;