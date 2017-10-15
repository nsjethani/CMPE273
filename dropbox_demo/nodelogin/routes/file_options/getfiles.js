var fs = require('fs');

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

var FileList=function (req,res){
    console.log("Session ID In filelist :", req.session.uid);
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
            sendFiles.push(file);
        }
        console.log(JSON.stringify(sendFiles));
        res.json({status:'201',filelist:sendFiles});
    });
};

exports.FileList = FileList