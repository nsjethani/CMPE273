var kafka = require('./../kafka/client');
var ObjectId = require('mongodb').ObjectID;

var deleteFile=function (req,res) {
    var now = new Date();
    var fid = req.body.file_id;
    var fname = req.body.fname;
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

    var data = {data2:data2,data1:data1,logdata:logdata}

    kafka.make_request('deletefile_topic',data, function(err,results){
         console.log("I got this result back after delete",results);
        if(err){
            console.log("Error in node in deleteion")
            res.json(results)
        }
        else
        {
            console.log("deleted successfully")
            res.json(results)
        }
    })
};

exports.deleteFile = deleteFile