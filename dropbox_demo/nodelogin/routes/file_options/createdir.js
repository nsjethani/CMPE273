var fs = require("fs");

var createdir = function (req, res) {
    var foldername = req.body.foldername;
    var dirpath = req.body.dirpath;

    var createpath = dirpath+'/'+foldername;

    console.log("createDir "+createpath);

    fs.mkdir(createpath, function(err,folder) {
        if (err) {
            console.log('Unable to create folder ', err);
        } else {
            console.log('folder created' , folder);
            res.status(201).json({
                message: 'Successfully created Directory',
                status: '201'
            });
        }
    });
};

exports.createdir= createdir;