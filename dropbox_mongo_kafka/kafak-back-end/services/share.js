var mongo = require('./mongo')
var userlog = require('./userlogs')
var nodemailer = require('nodemailer');
var zipFolder = require('zip-folder');

function shareFile(msg,callback)
/*{

    callback(msg)
}*/


{

    var res = {};
    console.log("In share file:" + JSON.stringify(msg));
    var emails = msg.emails
   // console.log("e is ",e)
   // var emails = e.split(',');
    console.log("emails ",emails)
    console.log("length of emails ",emails.length)
    console.log("Files ",msg.file)
    /*if(emails.length==1)
        {
            query = {email:emails[0]};
        }
        else
        {
            var len = emails.length;
            query = [];
            while(len>0){
                len--;
                query.push({email:emails[len]})
            }
            console.log("query : "+query);
            query = {$and:query};
        }
        console.log("query : "+JSON.stringify(query));
        mongo.findDocument("user",query,function(err,results){
            if(err){
                console.log(err);
            }else{
                console.log("after performimg query  ",JSON.stringify(results));
                callback(err,results);
            }
        })*/

    if(msg.file.isdir)
    {
        console.log("In zip folder a")
        var orig_path = msg.file.path + '/' + msg.file.name
        var dest_path = msg.file.path + '/' + msg.file.name + '.zip'

        zipFolder(orig_path, dest_path, function(err) {
            console.log("In zip folder b")
            if(err) {
                console.log('oh no!', err);
            } else {
                console.log('EXCELLENT');
            }
        });
    }

    var user = 'email_id used for mail sending'
    var pass = 'corresponding password'

    nodemailer.createTestAccount((err, account) => {

        var transporter = nodemailer.createTransport({

            service: 'gmail',
            //host: smtp.gmail.com,
            //port:465,
            auth: {
                user: user,
                pass: pass
            }
        });

        var path = '';
        var file_name = ''
        if(msg.file.isdir)
        {
            file_name = msg.file.name + '.zip'
            path = msg.file.path + '/' + msg.file.name + '.zip'}

        else {
            file_name = msg.file.name
            path = msg.file.path + '/' + msg.file.name
        }

        console.log("path to be shared is ",path)

        var mailOptions = {

            to: emails,
            subject: 'Files share with you',
            text: "A file has been shared with you. Please check attachment.",


            attachments: [
                {
                    filename: file_name,
                    path: path,
                    cid: 'abcd@example.com'
                },

            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            console.log("In sent mail")
            console.log("username ",user)
            console.log("pass ",pass)
            console.log("To ",mailOptions.to)
            if (error) {
                console.log("error occurred  ",error)
                //return console.log(error);
                //res.status(401).json();
            }
            else
            {
                console.log('Message sent');
            }
            //transporter.close();
            //res.status(200).json();
        });
});
  /*  userlog.userlogs(msg.logdata,function (err,results) {
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
*/

};


exports.shareFile= shareFile;
