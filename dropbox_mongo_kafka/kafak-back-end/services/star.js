var mongo = require('./mongo')
var userlog = require('./userlogs')

function starFile(msg,callback) {

    var res = {};
    console.log("In star file:" + JSON.stringify(msg));

    userlog.userlogs(msg.logdata,function (err,results) {
        if (err) {
            console.log("Error in inserting logs while star file")
            res.status = '401';
            res.message = 'error in userlogs in marking star file'
        }
    })
    mongo.insertDocument('starfile', msg.filedata, function (err, results) {
        if (err) {
            console.log("Error in starring file")
            res.status = '401';
            res.message = 'Error in starring file in starfile'
        }
        else
        {
            res.status='201'
            res.message='File starred'
        }
        callback(null, res)
    })


};

function unmarkStar(msg,callback) {

    var res = {};
    console.log("In star file:" + JSON.stringify(msg));

    userlog.userlogs(msg.logdata,function (err,results) {
        if (err) {
            console.log("Error in inserting logs while unstar file")
            res.status = '401';
            res.message = 'error in userlogs in marking unstar file'
        }
    })
    mongo.deleteDocument('starfile', msg.filedata, function (err, results) {
        if (err) {
            console.log("Error in unstarring file")
            res.status = '401';
            res.message = 'Error in unstarring file in starfile'
        }
        else
        {
            res.status='201'
            res.message='File unstarred'
        }
        callback(null, res)
    })
};
exports.starFile= starFile;
exports.unmarkStar= unmarkStar;