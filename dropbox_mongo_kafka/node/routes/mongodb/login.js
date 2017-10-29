var LocalStrategy   = require('passport-local').Strategy;

var kafka = require('./../kafka/client');


module.exports = function(passport){
    passport.use('login', new LocalStrategy(function(username, password, done) {
            console.log('in passport');
            kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
                console.log('in result');
                console.log("I got this result back",results);
                if(err){
                    done(err,{});
                }
                else
                {
                    if(results.code == 200){
                        results.user.code = '200'
                        done(null,results.user);
                    }
                    else {
                        done(null,false);
                    }
                }
            });

    })
    )};


