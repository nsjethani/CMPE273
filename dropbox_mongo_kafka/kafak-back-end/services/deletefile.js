var mongo = require('./mongo')
var userlog = require('./userlogs')

var ObjectId = require('mongodb').ObjectID;

function deleteFile(msg,callback) {
    res={}
    var flag=true;
    var del = {_id:ObjectId(msg.data2._id)};
    console.log("Msg in delete file ",msg);
    userlog.userlogs(msg.logdata,function (err,results) {
        if(err){
            flag=false
           console.log("error in userlogs while delete file operation");
           res.status='401';
           res.message= "error in userlogs while delete file operation";
            callback(err,res)
        }
                mongo.deleteDocument('filedata',del,function (err,results) {
                    if (err){
                        flag=false
                        console.log("error in deletefile from filedata");
                        res.status='401';
                        res.message= "error in deletefile from filedata";
                        callback(err,res)
                    }


                        mongo.deleteDocument('starfile',msg.data1,function (err,results) {
                            if(err){
                                flag=false;
                                console.log("error in delete file from star data");
                                res.status='401';
                                res.message= "error in delete file from star data";
                                callback(err,res)
                            }
                            if(flag){res.status = '201';
                            res.message = 'Deleted successfully';
                            callback(null,res)}
                        })

                })
    }
    )
};

exports.deleteFile = deleteFile