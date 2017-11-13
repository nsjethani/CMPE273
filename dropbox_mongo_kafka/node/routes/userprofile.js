var kafka = require('./kafka/client');

var saveUserProfile =  function (data,res) {
        var profiledata =
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

        var name =
        {
            id:data.session.user._id,
            fname : data.body.fname,
            lname : data.body.lname
        }

        var kafka_data = {profiledata:profiledata,name:name }

    kafka.make_request('saveprofile_topic',kafka_data, function(err,results){
        console.log("I got this result back after save profile",results);
        if(err){
            console.log("Error")
            res.json(results)
        }
        else
        {
            console.log("user profile saved")
            res.json(results)
        }
    });
};

var fetchUserProfile=function (req,res){
   var data = {id:req.session.user._id}
    //var data = {id:'59fa601cfe8f8c15a42cf566'}
    kafka.make_request('getprofile_topic',data, function(err,results){
        console.log("I got this result back after fetching user profile",results);
        if(err){
            console.log("Error")
            res.json(results)
        }
        else
        {
            console.log("git user profile")
            res.json(results)
        }
    });
};


exports.fetchUserProfile = fetchUserProfile

exports.saveUserProfile = saveUserProfile;
