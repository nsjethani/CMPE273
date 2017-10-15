var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var fs = require('fs');

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
    res.status(201).json(
        {status: '201'}
    );
});

module.exports = router;