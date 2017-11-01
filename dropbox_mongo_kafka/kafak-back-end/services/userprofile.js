var mongo = require('./mongo')
var ObjectId = require('mongodb').ObjectID;


var saveUserProfile =  function (msg,callback) {
    var res = {};
    console.log("In save user profile:" + JSON.stringify(msg));
        mongo.saveDocument('userprofile',msg.profiledata,function (err,results) {
            console.log("Done : User Profile")
        })
        mongo.findAndModifyDocument('user',msg.name);
        res.status= '201'
        callback(null,res)

};

var fetchUserProfile=function (msg,callback){
    var res={};
    console.log("In fetch profile at kafka back end")
    var sendLogs=[];
    var userdetail={};
        mongo.findDocument('user',{"_id": new ObjectId(msg.id)},function (err,user) {
            if(err){
                throw err;
            }
            for(var i=0;i<user.length;i++)
            {
                console.log("1st fetch ", user[i]);
                userdetail.fname = user[i].fname;
                userdetail.lname = user[i].lname;
            }
            mongo.findDocument('userprofile',{'_id':msg.id},function (err,user) {
                if(err){
                    throw err;
                }
                for(var i=0;i<user.length;i++)
                {
                    console.log("2nd fetch ",user[i]);
                    userdetail.overview = user[i].overview;
                    userdetail.work = user[i].work;
                    userdetail.highschool = user[i].highschool;
                    userdetail.bachelors = user[i].bachelors;
                    userdetail.masters = user[i].masters;
                    userdetail.otheredu = user[i].otheredu;
                    userdetail.mobile = user[i].mobile;
                    userdetail.lifeevent = user[i].lifeevent;
                    userdetail.music = user[i].music;
                    userdetail.show = user[i].show;
                    userdetail.sports = user[i].sports
                }
                sendLogs.push(userdetail)
                console.log("Profile here ",JSON.stringify(sendLogs));
                res.status='201';
                res.data=sendLogs;
                callback(null,res);
                //res.json({status:'201',data:sendLogs});
            })
        })
};


exports.fetchUserProfile = fetchUserProfile

exports.saveUserProfile = saveUserProfile;
