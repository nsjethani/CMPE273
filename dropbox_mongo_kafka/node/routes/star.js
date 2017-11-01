var kafka = require('./kafka/client');

var starFile = function (req, res) {
    var now = new Date();
    var fid = req.body.file_id;
    var fname = req.body.file_name;
    var fpath = req.body.file_path;
    var flag = true;
    var filedata = {
        userid : req.session.user._id,
        fid : fid,
        fname : fname,
        fpath : fpath,
        isFile:req.body.isdir
    }
    console.log('Data for star file ' , filedata);
    var logdata={
                userid : req.session.user._id,
                filename : fname,
                operation : 'File Starred',
                inserttime : (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString(),
                size: 0
            }
    console.log("Data to be inserted in log", logdata)

    var data = {filedata:filedata,logdata:logdata}

    kafka.make_request('star_topic',data, function(err,results){
        console.log("I got this result back after star file",results);
        if(err){
            console.log("Error")
            res.json(results)
        }
        else
        {
            console.log("starred")
            res.json(results)
        }
    });
};

var unmarkStar = function (req, res) {
    var now = new Date();
    var fid = req.body.file_id;
    var fname = req.body.file_name;
    var filedata = {
        fid : fid
    }
    console.log('Data for deleting star file ' , filedata);
    var logdata={
        userid : req.session.user._id,
        filename : fname,
        operation : 'File UnsStarred',
        inserttime : (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString(),
        size: 0
    }
    console.log("Data to be inserted in log", logdata)

    var data = {filedata:filedata,logdata:logdata}

    kafka.make_request('unstar_topic',data, function(err,results){
        console.log("I got this result back after star file",results);
        if(err){
            console.log("Error")
            res.json(results)
        }
        else
        {
            console.log("starred")
            res.json(results)
        }
    });


};
exports.starFile= starFile;
exports.unmarkStar= unmarkStar;