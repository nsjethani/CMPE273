var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressValidator = require('express-validator');
var session = require('client-sessions');

var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var files = require('./routes/files');
var download_file = require('./routes/file_options/download_file');
var listfiles = require('./routes/file_options/getfiles');
var logout = require('./routes/logout');
var app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//Enable CORS
app.use(cors(corsOptions));
app.use(session({
    cookieName: 'session',
    secret: 'cmpe273_dropbox',
    duration: 30 * 60 * 1000,    //setting the time for active session
    activeDuration: 5 * 60 * 1000,  }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/signup',signup);
app.use('/files',files);
app.post('/getfiles', listfiles.FileList);
app.post('/logout',logout.logout);
app.post('/downloadfile',download_file.downloadfile );

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

module.exports = app;
