
    var uid = 0;

    var getID = function() {
        return uid;
    };

    var setID = function(id) {
        uid = id;
    };

exports.getID = getID;
exports.setID = setID;