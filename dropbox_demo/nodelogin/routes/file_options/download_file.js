var path = require('path');
var mime = require('mime');

var downloadfile = function(req, res){
    console.log(req.body.path)
    console.log(req.body.name)
    var file = req.body.path+'/'+req.body.name;
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
    console.log('file path :' , file)
    console.log('file name : ', filename )
    console.log(mimetype)


    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
    res.download(file);

};

exports.downloadfile= downloadfile;