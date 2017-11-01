var mongo = require('./mongo')

function FileList(msg,callback) {
    var res = {};
    console.log("In get files at kafka back end:"+ JSON.stringify(msg));
        mongo.findDocument('filedata',{'path': msg.pathdata.path},function (err, user) {
            if (err) {
                throw err;
            }
            //console.log("User Files ", user)
            var sendFiles = [];
            for (var i = 0; i < user.length; i++) {
                var file = {};
                file.id = user[i]._id, file.path = user[i].path;
                file.name = user[i].filename;
                file.isdir = (!user[i].isFile);
                sendFiles.push(file);
            }
            console.log(JSON.stringify("File List ",sendFiles));

            mongo.findDocument('starfile',{'userid': msg.userid.userid},function (err, user) {
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
                res={status: '201', filelist: sendFiles, starlist: StarList};
                callback(err,res)
            })
        })
};
exports.FileList = FileList;