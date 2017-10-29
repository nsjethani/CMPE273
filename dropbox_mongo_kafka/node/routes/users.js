//import UserProfile from './userprofile';

var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var expressValidator = require('express-validator');

var UserProfile=require('./userprofile')
var listdir = require('./file_options/getfiles');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

const saltRounds = 10;
router.post('/doLogin', function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;


    var getUser = "select * from dropbox.users where email='" + reqUsername + "'";
    console.log("Query is:" + getUser);

    mysql.fetchData(function (err, results) {
        console.log("In fetch data");
        var session = req.session;
        if (err) {
            throw err;
        }
        else {
            console.log("In else of fetch data")
            if (results.length > 0 && mysql.compareHashed(reqPassword,results[0].password)) {
                console.log(results);
                session.uid = results[0].userid;
                console.log("I got userid ", results[0].userid);
                //UserProfile.setID(results[0].userid);
                //console.log("Userid " ,UserProfile.getID());
                console.log("I am in session", session.uid);
                var rootdir = './Root_Directory/' + results[0].userid;
                var fname = results[0].firstname;
                console.log("First Name ", fname)
                console.log(rootdir);
     //           listdir.FileList(function(err,filelist){

                    res.status(201).json({
                        results: results,
                        username: req.session.email,
                        userid: results[0].userid,
                        status: 201,
                        //filelist:filelist,
                        rootdir:rootdir,
                        fname:fname
                    });
       //             });
                }}

            },getUser);

});
module.exports = router;
