var path = require('path');
var mime = require('mime');

var userlog = require('./../userlogs');

var downloadfile = function(req, res){
    var file = req.body.path+'/'+req.body.name;
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
    var now = new Date();
    var insertdata={
        userid : req.session.user._id,
        filename : filename,
        operation : 'Doenload file',
        inserttime : (now.getMonth()+1) +'/' + now.getDate() + '/' +now.getFullYear() + ' ' +now.toLocaleTimeString(),
        size: 0
    }
    console.log("Data to be inserted ", insertdata)
    userlog.userlogs(insertdata,function (err,results) {
        if(err)
            throw err;
        else
            console.log("File download activity noted")
    })
    console.log(req.body.path)
    console.log(req.body.name)
    /*var file = req.body.path+'/'+req.body.name;
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);*/
    console.log('file path :' , file)
    console.log('file name : ', filename )
    console.log(mimetype)
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
    res.download(file);

};

exports.downloadfile= downloadfile;