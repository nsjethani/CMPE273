var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongo = require('./mongodb/mongo');
var url = 'mongodb://localhost:27017/dropbox';
var ObjectId = require('mongodb').ObjectID;


var saveUserProfile =  function (data,res) {
    mongo.connect(function(db){
        console.log("Connected to MongoDB at ",url)
        profiledata =
            {
                _id : data.session.user._id,
                overview: data.body.overview,
                work: data.body.work,
                highschool: data.body.highschool,
                bachelors: data.body.bachelors,
                masters: data.body.masters,
                otheredu: data.body.otheredu,
                mobile: data.body.mobile,
                lifeevent: data.body.lifeevent,
                music: data.body.music,
                show: data.body.show,
                sports: data.body.sports }

        name =
        {
            id:data.session.user._id,
            fname : data.body.fname,
            lname : data.body.lname
        }
         mongo.saveDocument(db,'userprofile',profiledata,function (err,results) {
            console.log("Done : User Profile")
        })
        mongo.findAndModifyDocument(db,'user',name);
        res.json({status:'201'})
    });
};

var fetchUserProfile=function (req,res){
    var sendLogs=[];
    var userdetail={};
    mongo.connect(function(db) {
        db.collection('user').find({"_id": new ObjectId(req.session.user._id)}).toArray(function (err,user) {
                if(err){
                    throw err;
                }
                for(var i=0;i<user.length;i++)
                {
                    console.log("1st fetch ", user[i]);
                    userdetail.fname = user[i].fname;
                    userdetail.lname = user[i].lname;
                }
        db.collection('userprofile').find({'_id':req.session.user._id}).toArray(function (err,user) {
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
                res.json({status:'201',data:sendLogs});
        })
    })
    })
};


exports.fetchUserProfile = fetchUserProfile

exports.saveUserProfile = saveUserProfile;
