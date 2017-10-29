var mongo = require('./mongo')
var userlog = require('./userlogs')

function fileupload(msg, callback) {
    var res = {};
    console.log("In file upload:" + JSON.stringify(msg));

    userlog.userlogs(msg.logdata, function (err, results) {
        if (err) {
            console.log("Error in inserting logs while file upload")
            res.status = '401';
            res.message = 'error in userlogs in file upload'
        }
    })
    mongo.connect(function (db) {
        mongo.insertDocument(db, 'filedata', msg.filedata, function (err, results) {
            if (err) {
                console.log("Error in inserting logs while file upload")
                res.status = '401';
                res.message = 'error in filedata'
            }
            else
            {
                res.status='201'
                res.message='File uploaded'
            }
            callback(null, res)
        })
    }
);
}

exports.fileupload = fileupload;

