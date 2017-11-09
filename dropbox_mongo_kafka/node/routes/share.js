var kafka = require('./kafka/client');

var check_emails = function(req,res){
    var address = req.body.emails;
    var file = req.body.file
    var emails = address.split(',');
    console.log(address);

    var data = {emails:emails,file:file}

   kafka.make_request('check_mail_topic',data, function(err,results){
        console.log("I got this result back after validating emails",results);
        if(err){
            console.log("Error in validation")
            res.json(results)
        }
        else
        {
            console.log("validated")
            res.json(results)
        }
    })

}

exports.check_emails = check_emails;

