var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var expressValidator = require('express-validator');
var fs = require('fs');
var mongo = require('./mongodb/mongo');
var url = 'mongodb://localhost:27017/dropbox';

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

const saltRounds = 10;
router.post('/doSignup', function (req, res, next) {

    req.checkBody('fname', 'First Name field cannot be empty.').notEmpty();
    req.checkBody('fname', 'Username must be between 2-15 characters long.').len(2, 15);
    req.checkBody('lname', 'First Name field cannot be empty.').notEmpty();
    req.checkBody('lname', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('pass', 'Password must be between 4-100 characters long.').len(4, 100);
    //req.checkBody("pass", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");

    const errors = req.validationErrors();

    if(errors){
        res.status(401).json({errors : errors,
            status : '401'
        });
    console.log(JSON.stringify(errors));
    }
    else {
        var reqFname = req.body.fname;
        var reqLname = req.body.lname;
        var reqEmail = req.body.email;
        var reqPass = mysql.hashing(req.body.pass);

        var data = {fname : reqFname,
                    lname : reqLname,
                    email : reqEmail,
                    passwd : reqPass
        }

        mongo.connect(function(db){
            console.log("Connected to MongoDB at ",url)
            var coll = db.collection('user');
            coll.findOne({'email':reqEmail},function (err,user) {
                if(err){
                    console.log("sending status 401")
                    res.json({
                        status : '401',
                        msg : 'Error founds'
                    });
                }
                else if(user){
                    console.log("sending status 401")
                    res.json({
                        status : '401',
                        msg : 'User already exists.'
                    });
                }

            else{
            mongo.insertDocument(db,'user',data,function (err,results) {
                if (err) {
                    console.log("sending status 401")
                    res.json({
                        status: '401',
                        msg: 'Error founds'
                    });
                }
                else {
                    console.log("User Registered")
                    var path = results["ops"][0]["_id"];
                    console.log(path);
                    fs.mkdir('../node/Root_Directory/' + path, function (err, folder) {
                        if (err) {
                            console.log('Unable to create folder ', err);
                        } else {
                            console.log('folder created', folder);
                        }
                    });
                    res.json({
                        status: '201',
                        msg: 'Registration done'
                    });
                }
            })}
            })
        });
    }
});

module.exports = router;
