var mongo = require('./mongo')
var userlog = require('./userlogs')
var nodemailer = require('nodemailer');
var zipFolder = require('zip-folder');

function shareFile(msg,callback)
/*{
    callback(msg)
}*/

{

    var query = '';
    var res = {};
    console.log("In share file:" + JSON.stringify(msg));
    var emails = msg.emails
    // console.log("e is ",e)
    // var emails = e.split(',');
    console.log("emails ",emails)
    console.log("length of emails ",emails.length)
    if(emails.length==1)
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
            //    callback(err,results);
            }
        })

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
