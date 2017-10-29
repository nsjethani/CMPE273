var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var fs = require('fs');
var userlog = require('./userlogs');
var mongo = require('./mongodb/mongo');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Headers", req.headers)
        cb(null,req.headers.path)
    },
    filename: function (req, file, cb) {
        var fname=file.originalname;
        console.log(fname)
        cb(null, file.originalname);

    },
});

var upload = multer({storage:storage});

router.post('/upload', upload.any(), function (req, res, next) {
    var flag = true;
    var now = new Date();
    console.log("In file upload ", req.files)
        var data={
            userid : req.session.user._id,
            filename : req.files[0].originalname,
            operation : 'Insert',
            inserttime : (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString(),
            size: req.files[0].size
        }
        console.log("Data to be inserted in userlog", data)
        var filedata={
            userid : req.session.user._id,
            filename : req.files[0].originalname,
            path : req.headers.path,
            isFile : true,
            inserttime: (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString()
        }
        console.log("Data to be inserted in files collection while uploading file ",filedata)
    userlog.userlogs(data,function (err,results) {
        if(err){
            flag = false;

        }
    })
    mongo.connect(function(db){
        mongo.insertDocument(db,'filedata',filedata,function (err,results) {
            if(err)
                flag=false
        })
    });

    if(flag){
    res.status(201).json(
        {status: '201'}
    );}
});

module.exports = router;