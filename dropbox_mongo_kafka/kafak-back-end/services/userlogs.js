var express = require('express');
var router = express.Router();
var mongo = require('./mongo');
var url = 'mongodb://localhost:27017/dropbox';

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
})

function userlogs(msg, callback){
    var res = {};
    console.log("In handle userlogs:"+ JSON.stringify(msg));
    mongo.connect(function(db) {
        mongo.insertDocument(db,'userlogs',msg,function (err,results) {
            if(err){
                console.log("sending status 401 coz of error")
                res.code = "401";
                res.value = "Error exists"
                res.results = results
            }
            else{
                console.log("sending status 201 in user log insertion")
                res.code = "201";
                res.value = "user log inserted"
                res.results = results
            }
            callback(err,res)
        })}
        )
    }

exports.userlogs=userlogs;

