var fs = require("fs");
var userlog = require('./../userlogs');
var mongo = require('./../mongodb/mongo');

var createdir = function (req, res) {
    var foldername = req.body.foldername;
    var dirpath = req.body.dirpath;
    var flag = true;
    var createpath = dirpath+'/'+foldername;

    console.log("createDir "+createpath);

    fs.mkdir(createpath, function(err,folder) {
        if (err) {
            console.log('Unable to create folder ', err);
        } else {
            console.log('folder created' , folder);
            var now = new Date();
            var data={
                userid : req.session.user._id,
                filename : foldername,
                operation : 'Create Folder',
                inserttime : (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString(),
                size: 0
            }
            console.log("Data to be inserted ", data)
            var filedata={
                userid : req.session.user._id,
                filename : foldername,
                path : dirpath,
                isFile : false,
                inserttime: (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString(),
            }
            console.log("Data to be inserted in files collection while creating folder ",filedata)
            userlog.userlogs(data,function (err,results) {
                if(err){
                    flag=false;
                }
            })
            mongo.connect(function(db){
                mongo.insertDocument(db,'filedata',filedata,function (err,results) {
                    if(err)
                        flag=false
                })
            });
            if(flag) {
                res.status(201).json({
                    message: 'Successfully created Directory',
                    status: '201'
                });
            }
        }
    });
};

exports.createdir= createdir;