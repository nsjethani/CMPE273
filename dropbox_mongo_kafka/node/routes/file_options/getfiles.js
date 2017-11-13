var kafka = require('./../kafka/client');

var FileList=function (req,res) {
    var pathdata={'path':req.body.dir};
    var userid = {'userid': req.session.user._id}
    //var userid = {'userid': "59fa601cfe8f8c15a42cf566"}
    var data = {pathdata:pathdata,userid:userid}

    kafka.make_request('getfiles_topic',data, function(err,results){
        console.log("I got this result back after getting files",results);
        if(err){
            console.log("Error")
            res.json(results)
        }
        else
        {
            console.log("got the files")
            res.json(results)
        }
    });
};

exports.FileList = FileList