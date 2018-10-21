const express = require ('express'); //Sever
const bodyParser = require('body-parser') //JSON Middleware
const logger = require('morgan'); // REST Logger
const mongoose = require('mongoose'); // Mongo ORM
const routes = require("./routes");
let db = require("./models"); // Require all models


//Connections
let PORT = process.env.PORT || 8080;
let mongooseConnection = mongoose.connection;

//Start Express
let app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // JSON Interactions between Client and Server
app.use(express.static("client/build")); //For static React pages
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

mongoose.Promise = global.Promise; //Sets up promises with Mongoose

// NEED TO ADD MONGOOSE DB FROM HEROKU
mongoose.connect(
    process.env.MONGODB_URI || "mongodb: "
)

mongooseConnection.once('open', function (req,res,next) {
    console.log('Successfully Connected to Mongo DB !')
});

var cors = require('cors');
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    next();
});
app.use(cors());


app.use(routes); // Add both API and view routes

app.listen(PORT, function() {
    console.log('API Server now listening on PORT ${PORT}!');
});
