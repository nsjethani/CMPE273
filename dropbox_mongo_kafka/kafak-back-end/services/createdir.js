var fs = require("fs");
var mongo = require('./mongo')
var userlog = require('./userlogs')

function createdir(msg,callback) {
    var res = {};
    //console.log("In create directory:" + JSON.stringify(msg));
    var createpath = './../node/'+msg.createpath;
    fs.mkdir(createpath, function(err,folder) {
        if (err) {
            console.log('Unable to create folder ', err);
        } else {
            console.log('folder created' , folder);
            userlog.userlogs(msg.logdata,function (err,results) {
                if(err){
                    res.status='401';
                    res.message = 'Error in userlogs'
                    callback(err,res)
                }
            })
            mongo.connect(function(db){
                mongo.insertDocument(db,'filedata',msg.filedata,function (err,results) {
                    if(err){
                        res.status='401';
                        res.message = 'Error in create folder entry'
                        callback(err,res)
                    }
                    res.status ='201';
                    res.message = 'Folder created'
                    callback(err,res)
                })
            });
        }
    });
};

exports.createdir= createdir;