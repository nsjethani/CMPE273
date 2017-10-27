var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongo = require('./mongodb/mongo');
var url = 'mongodb://localhost:27017/dropbox';

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

var userlogs =  function (data,callback) {
    mongo.connect(function(db){
        console.log("Connected to MongoDB at ",url)
        mongo.insertDocument(db,'userlogs',data,function (err,results) {
            callback(err,results)
        })
    });
};

exports.userlogs = userlogs;
