var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var mysql = require('./mysql');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/doSignup', function (req, res, next) {
        var reqFname = req.body.fname;
        var reqLname = req.body.lname;
        var reqEmail = req.body.email;
        var reqPass = mysql.hashing(req.body.pass);

        var data = {fname : reqFname,
                    lname : reqLname,
                    email : reqEmail,
                    passwd : reqPass
        }

    kafka.make_request('signup_topic',data, function(err,results){
        console.log("I got this result back after signing up",results);
        if(err){
            console.log("Error")
            res.json(results)
        }
        else
        {
            console.log("registered")
            res.json(results)
        }
    });
});

module.exports = router;
