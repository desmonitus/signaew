
/**
 * Module dependencies.
 */
var mysql      = require('mysql');
global.pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'poont',
    debug    :  false
});
var express = require('express')
  , indexRoute = require('./routes')
  , profileRoute = require('./routes/profile')
  , signaewRoute = require('./routes/signaew')
  , http = require('http')
  , path = require('path');
var app = express();


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
  // app.use(express.favicon(__dirname + '/img/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
app.get('/', indexRoute.onReady);
app.post('/', indexRoute.indexPost);
app.get('/profile',profileRoute.onReady);
app.get('/signaew',signaewRoute.onReady);
// app.get('/hero/:name', routes.hero);
// app.post('/hero/add-fact', routes.addFact);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});