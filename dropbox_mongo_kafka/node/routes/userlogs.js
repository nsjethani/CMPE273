var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');


/* insert into user logs. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

var userlogs =  function (data,callback) {
    kafka.make_request('userlogs_topic',data, function(err,results){
        console.log("I got this result back after inserting logs",results);
        if(err){
            console.log("Error")
            callback(err,results)
        }
        else
        {
            console.log("user logs inserted")
            callback(err,results)
        }
    });
};

exports.userlogs = userlogs;
