'use strict';

//dependencies
const express = require('express'),
	  exphbs = require('express-handlebars'),
	  bodyParser = require('body-parser'),
	  logger = require('morgan'),
	  mongoose = require('mongoose'),
	  methodOverride = require('method-override');
	  //mysql = require('mysql');
	  //connection;

//set up express app
const PORT = process.env.PORT || 3000;
let app = express();

//debugger;

app 
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended:true }))
	.use(bodyParser.text())
	.use(bodyParser.json({ type: 'application/vnd.api+json' }))
	.use(methodOverride('_method'))
	.use(logger('dev'))
	.use(express.static(__dirname + '/public'))
	.engine('handlebars', exphbs({ defaultLayout: 'main' }))
	.set('view engine', 'handlebars')
	.use(require('./controllers'));

//if(process.env.JAWSDB_URL) {
//	connection = mysql.createConnection(process.env.JAWSDB_URL);
//} else {
//	connection = mysql.createConnection("mysql://xoxutv2vkvcfnt2l:yuhpj5q05cptlg28@kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/aq652hi1tvt4l0zz");
//	
//	connection = mysql.createConnection({
 //	host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	//user: 'xoxutv2vkvcfnt2l',
	//password: 'yuhpj5q05cptlg28', //do not know my password trying to figure it out :/
 	//database: 'mud2eihhpczqyukl', //my database
//	port: 3306,
//	SSL: 'enabled with AES256-SHA'
 //	});
//}

//configure mongoose and start the server
//set mongoose to leverage promises
mongoose.Promise = Promise;
const dbURI = process.env.MONGODB_URI || "mongodb://<heroku_6bcvrt0m>:<54321cab>@ds157325.mlab.com:57325/heroku_6bcvrt0m";

// //Database configuration with mongoose
mongoose.Promise = Promise;
mongoose.connect(dbURI);

mongoose.connect("mongodb://localhost/Scrape-That-News", {
	useMongoClient: true 
});

const db = mongoose.connection;

//const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/Scrape-That-News', { useMongoClient: true}

//Show any mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

//once logged in to the db through mongoose, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful.");
	//start the server, listen on port 3000
	app.listen(3306, function() {
		console.log("App running on port 3306");
	});
});

module.exports = app;
//module.exports = connection;