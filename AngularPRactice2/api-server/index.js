// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var Axios =require ("axios");
const { createProxyMiddleware } = require('http-proxy-middleware');

const passportControl = require('./config/passport');
const compression = require("compression");

var express = require("express");
var bodyParser = require('body-parser');

// Sets up the Express App
// =============================================================
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(compression())


var PORT = process.env.PORT || 8081;
const server = require("http").createServer(app);

// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200,
//   credentials:false
// };
// const io = require('socket.io')(server,
// {
//   cors: {
//     origin: "*",
//     methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
//     credentials: false
//   }
//   ,  transports: ["websocket", "polling"],

//    allowEIO3: true 
// }
// );


// Requiring our models for syncing
var db = require("./models");
var session = require("express-session");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors())

// Static directory
// app.use(express.static("public"));
app.use(
	session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
  );
  app.use(passportControl.initialize());
  app.use(passportControl.session());
// Routes
// =============================================================
require("./routes/api-routes")(app);



db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    

  
  });
});