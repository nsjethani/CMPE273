var express = require('express');
var router = express.Router();
var multer = require('multer');
var kafka = require('./kafka/client');

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
    var now = new Date();
    console.log("In file upload ", req.files)
        var logdata={
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

        var data = {logdata:logdata,filedata:filedata}
    kafka.make_request('upload_topic',data, function(err,results){
        console.log("I got this result back file upload",results);
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