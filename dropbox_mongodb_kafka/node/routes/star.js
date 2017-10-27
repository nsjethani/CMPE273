var userlog = require('./userlogs');
var mongo = require('./mongodb/mongo');

var starFile = function (req, res) {
    var now = new Date();
    var fid = req.body.file_id;
    var fname = req.body.file_name;
    var fpath = req.body.file_path;
    var flag = true;
    var data = {
        userid : req.session.user._id,
        fid : fid,
        fname : fname,
        fpath : fpath,
        isFile:req.body.isdir
    }
            console.log('Data for star file ' , data);
            var logdata={
                userid : req.session.user._id,
                filename : fname,
                operation : 'File Starred',
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
                mongo.insertDocument(db,'starfile',data,function (err,results) {
                    if(err)
                        flag=false
                })
            });
            if(flag) {
                console.log("Successfully Starred file")
                res.status(201).json({
                    message: 'Successfully Starred file',
                    status: '201'
                });
            }
};

var unmarkStar = function (req, res) {
    var now = new Date();
    var fid = req.body.file_id;
    var fname = req.body.file_name;
    var flag = true;
    var data = {
        fid : fid
    }
    console.log('Data for deleting star file ' , data);
    var logdata={
        userid : req.session.user._id,
        filename : fname,
        operation : 'File UnsStarred',
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
        mongo.deleteDocument(db,'starfile',data,function (err,results) {
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
exports.starFile= starFile;
exports.unmarkStar= unmarkStar;