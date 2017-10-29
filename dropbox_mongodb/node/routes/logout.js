var logout = function(req,res){
    var session=req.session;
    console.log("In logout ", req.session.user)
    session.user = null;
    session.destroy();
    res.status(201).json({
        status:'201',
        message : "Logged Out."
    });
};

exports.logout=logout;