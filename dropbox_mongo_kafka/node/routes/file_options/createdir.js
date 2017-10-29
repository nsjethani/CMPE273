var kafka = require('./../kafka/client');

var createdir = function (req, res) {
    var foldername = req.body.foldername;
    var dirpath = req.body.dirpath;
    var createpath = dirpath+'/'+foldername;

//    console.log("createDir "+createpath);

    var now = new Date();
    var logdata={
        userid : req.session.user._id,
        filename : foldername,
        operation : 'Create Folder',
        inserttime : (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString(),
        size: 0
    }
 //   console.log("Data to be inserted in log", logdata)
    var filedata={
        userid : req.session.user._id,
        filename : foldername,
        path : dirpath,
        isFile : false,
        inserttime: (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString(),
    }
   // console.log("Data to be inserted in files collection while creating folder ",filedata)


    var data = {createpath:createpath,logdata:logdata,filedata:filedata}
    kafka.make_request('createdir_topic',data, function(err,results){
   //     console.log("I got this result back after create directory",results);
        if(err){
            console.log("Error in node in folder creation")
            res.json(results)
        }
        else
        {
            console.log("folder created")
            res.json(results)
        }
    });
};

exports.createdir= createdir;