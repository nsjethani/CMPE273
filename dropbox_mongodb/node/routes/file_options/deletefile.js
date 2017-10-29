var mongo = require('./../mongodb/mongo')
var userlog = require('./../userlogs');
var ObjectId = require('mongodb').ObjectID;

var deleteFile=function (req,res) {
    var now = new Date();
    var fid = req.body.file_id;
    var fname = req.body.fname;
    var flag = true;
    var data1 = {
        fid:fid
    }
    var data2 = {
        "_id" : ObjectId(fid)
    }
    console.log('Data for deleting file ' , data2);
    var logdata={
        userid : req.session.user._id,
        filename : fname,
        operation : 'File Deleted',
        inserttime : (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString(),
        size: 0
    }
    console.log("Data to be inserted in log", logdata)

    userlog.userlogs(logdata,function (err,results) {
        if(err){
            flag=false;
        }
    })
    mongo.connect(function(db){
        mongo.deleteDocument(db,'filedata',data2,function (err,results) {
            if(err)
                flag=false
        })
    });
    mongo.connect(function(db){
        mongo.deleteDocument(db,'starfile',data1,function (err,results) {
            if(err)
                flag=false
        })
    });
    if(flag) {
        console.log("Successfully UnStarred file")
        res.status(201).json({
            message: 'Successfully UnStarred file',
            status: '201'
        });
    }

};

exports.deleteFile = deleteFile