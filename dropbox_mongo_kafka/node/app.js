var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressValidator = require('express-validator');
var passport = require('passport');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);
var fileUpload = require('express-fileupload')
var kafka = require('./routes/kafka/client');
require('./routes/mongodb/login')(passport);

var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var files = require('./routes/files');
var download_file = require('./routes/file_options/download_file');
var delfile = require('./routes/file_options/deletefile');
var listfiles = require('./routes/file_options/getfiles');
var listlogs = require('./routes/mongodb/getlogs');
var file = require('./routes/file_options/createdir')
var logout = require('./r' +
    '' +
    'outes/logout');
var userprofile = require('./routes/userprofile')
var star =  require('./routes/star')
var share = require('./routes/share')

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//Enable CORS
app.use(cors(corsOptions));
/*
app.use(session({
    cookieName: 'session',
    secret: 'cmpe273_dropbox',
    duration: 30 * 60 * 1000,    //setting the time for active session
    activeDuration: 5 * 60 * 1000,  }));
*/




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());
app.use(passport.session())


app.use('/', index);
app.use('/users', users);
app.use('/signup',signup);
app.use('/files',files);
app.post('/getfiles', listfiles.FileList);
app.post('/getlogs', listlogs.LogList);
app.post('/logout',logout.logout);
app.post('/downloadfile',download_file.downloadfile );
app.post('/createdir',file.createdir);
app.post('/saveUserProfile',userprofile.saveUserProfile);
app.post('/fetchUserProfile',userprofile.fetchUserProfile);
app.post('/unstar',star.unmarkStar);
app.post('/star',star.starFile);
app.post('/deletefile',delfile.deleteFile);
app.post('/check_emails',share.check_emails);



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

app.post('/login', function(req, res) {
    passport.authenticate('login', function(err, user) {
        if(err) {
            return res.status(500).send({status:500});
        }
        if(!user) {
           return res.status(401).send({status:401});
        }
        console.log(user)
        if(user) {
            req.session.user = user;
            /* req.session.uid = user._id;
             req.session.save();*/
            console.log("session initilized");
            var rootdir = './Root_Directory/' + user._id
            console.log("Session is ", req.session.user)
            console.log(rootdir)
            return res.status(201).send({
                status: 201,
                username: user.email,
                fname: user.fname,
                userid: user._id,
                rootdir: rootdir
            });
        }
    })(req, res);
});
//send upload file data
app.use(fileUpload());
app.post('/upload',function (req,res) {
        console.log('------------------------------------')
            console.log(req.files.myfile.data)
        console.log('------------------------------------')
    console.log("req.files.myfile. ",req.files.myfile)
    var now = new Date();
    var logdata={
        userid : req.session.user._id,
        filename : req.files.myfile.name,
        operation : 'Insert',
        inserttime : (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString()
    }
    //console.log("Data to be inserted in userlog", logdata)
    var filedata={
        userid : req.session.user._id,
        filename : req.files.myfile.name,
        path : req.headers.path,
        isFile : true,
        inserttime: (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString()
    }

    //console.log("Data to be inserted in files collection while uploading file ",filedata)

    var data = {logdata:logdata,filedata:filedata,buffer:req.files.myfile.data,encoding:req.files.myfile.encoding,mime:req.files.myfile.mimetype}

   // var upload_path = filedata.path + '/' +filedata.filename
    /*var upload_path = filedata.path

    req.files.myfile.mv(upload_path, function (err) {
        if(err)
            console.log("Could not upload file coz of ",err)
        else
            console.log("File uploaded on ",upload_path)
    })*/

    //console.log('------------------------------------')
    //console.log("Data to be uploaded is ", data)
    //console.log('------------------------------------')

    kafka.make_request('upload_topic',data, function(err,results){
        console.log("I got this result back file upload",results);
        if(err){
            console.log("Error")
            res.json(results)
        }
        else
        {
            console.log("uploaded file")
            res.json(results)
        }
    });
    }
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
