var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var expressValidator = require('express-validator');
var fs = require('fs');

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
   // req.checkBody("pass", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");

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

        var checkUser = "select * from dropbox.users where email = '"+reqEmail+"'";
        console.log(checkUser);
        mysql.fetchData(function (err,results) {
            if(err){
                throw err;
            }
            else{
                if(results.length>0)
                {
                    console.log('The email already taken' );
                    res.status(401).json({results: results,
                        status : '401',
                        msg : 'This e-mail is already taken'
                    });
                }
                else{
                    var insertUser = "insert into dropbox.users (email,firstname,lastname,password) VALUES ('" + reqEmail + "','" + reqFname + "','" + reqLname + "','" + reqPass + "')";
                    console.log("Query is:" + insertUser);
                    console.log("on server side 1");
                    mysql.setData(function (err, results) {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("on server side 2");
                            // render on success
                            if (!err) {
                                console.log('The result of insertion is :', results );
                                res.status(201).json({results: results,
                                    status : '201'
                                });

                                fs.mkdir( '../nodelogin/Root_Directory/' + results.insertId, function(err,folder) {
                                    if (err) {
                                        console.log('Unable to create folder ', err);
                                    } else {
                                        console.log('folder created' , folder);
                                    }
                                });
                            }
                            // render or error
                            else {
                                res.end('An error occurred');
                                console.log(err);
                            }
                        }
                    }, insertUser);
                }
            }
        },checkUser);



    }
});

module.exports = router;
