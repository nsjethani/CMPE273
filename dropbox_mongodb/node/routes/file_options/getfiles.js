var fs = require('fs');
var mongo = require('./../mongodb/mongo')

/*var FileList=function (callback){
    console.log(UserProfile.getID());
    path="./Root_Directory/"+UserProfile.getID();
    fs.readdir(path , function (err, files)
    {
        console.log("Path ",path);
        if(err){
            throw err;
        }
        var sendFiles=[];

        for(var i=0;i<files.length;i++)
        {
            var file = {};
            file.name = files[i];
            sendFiles.push(file);
        }
        console.log(JSON.stringify(sendFiles));
        callback(err,sendFiles);
    });
};*/

/*
var FileList=function (req,res){
    console.log("Neha ",req.session)
    console.log("Session ID In filelist :" +req.session.user._id);
    //path="./Root_Directory/"+req.session.userid;
    console.log(req.body)
    var path=req.body.dir;
    fs.readdir(path , function (err, files)
    {
        console.log("Path ",path);
        if(err){
            throw err;
        }
        var sendFiles=[];

        for(var i=0;i<files.length;i++)
        {
            var file = {};
            file.path = path;
            file.name = files[i];
            var fullfile = file.path + '/' + files[i];
            file.isdir = fs.statSync(fullfile).isDirectory();
            console.log(fs.statSync(fullfile).isDirectory());
            sendFiles.push(file);
        }
        console.log(JSON.stringify(sendFiles));
        res.json({status:'201',filelist:sendFiles});
    });
};
*/
var FileList=function (req,res) {
    mongo.connect(function (db) {
        db.collection('filedata').find({'path': req.body.dir}).toArray(function (err, user) {
                if (err) {
                    throw err;
                }
                //console.log("User Files ", user)
                var sendFiles = [];
                for (var i = 0; i < user.length; i++) {
                    var file = {};
                    file.id = user[i]._id,
                        file.path = user[i].path;
                    file.name = user[i].filename;
                    file.isdir = (!user[i].isFile);
                    sendFiles.push(file);
                }
               console.log(JSON.stringify("File List ",sendFiles));

            db.collection('starfile').find({'userid': req.session.user._id}).toArray(function (err, user) {
                if (err) {
                    throw err;
                }
                console.log("star Files ", user)
                var StarList = [];
                for (var i = 0; i < user.length; i++) {
                    var file = {};
                    file.id = user[i].fid,
                        file.path = user[i].fpath;
                    file.name = user[i].fname;
                    file.isdir = (!user[i].isFile);
                    StarList.push(file);
                }
                console.log("Sending Starred List ",JSON.stringify(StarList));
                res.json({status: '201', filelist: sendFiles, starlist: StarList});
            })
            })
    })
};

exports.FileList = FileList