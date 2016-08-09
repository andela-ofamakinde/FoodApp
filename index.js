(function() {
  global._ = require('lodash');

  var express = require('express');
  var bodyParser = require('body-parser');
  var morgan = require('morgan');
  var mongoose = require('mongoose');
  var config = require('config');
  var cors = require('cors');
  var foodRouter = require("./server/routes/food.routes");

  mongoose.connect(config.dbUrl);

  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
  app.use(morgan("combined"));
  app.use(cors());

  app.use(express.static(__dirname + '/public'));

  app.use('/food', foodRouter);

  app.listen(config.port, function(){
    console.log("magic on port " + config.port);
  });

  module.exports = app;
})()
