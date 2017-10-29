
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 20,
    host : 'localhost',
    user : 'root',
    password : 'iamatsjsu1',
    database : 'dropbox',
    port : 3306,
    debug : false
});

var fetchData = function(callback, sqlQuery,data) {
    pool.getConnection(function(err, connection) {
        connection.query(sqlQuery,data, function(err, rows) {

            if (err) {
                console.log("ERROR: " + err.message);
            } else {
                callback(err, rows);
            }
            connection.release();
        });
    });
};

var setData = function(callback, sqlQuery,data) {
    pool.getConnection(function(err, connection) {
        connection.query(sqlQuery,data, function(err, rows) {
            try {
                if (err) {
                    console.log("ERROR: " + err.message);
                }
                callback(err, rows);

            } finally {
                connection.release();
            }
        });
    });

};

var bcrypt = require('bcrypt');

var hashing = function(passwd) {
    var salt = bcrypt.genSaltSync(10);
    var newPass = bcrypt.hashSync(passwd, salt);
    return newPass;
};

var compareHashed = function(passwd,hash){
    return bcrypt.compareSync(passwd, hash);
};

exports.hashing=hashing;
exports.compareHashed=compareHashed;
exports.fetchData = fetchData;
exports.setData = setData;

/*
//Put your mysql configuration settings - user, password, database and port
function getConnection(){
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'iamatsjsu1',
        database : 'dropbox',
        port	 : 3306
    });
    return connection;
}

function fetchData(callback,sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);

    var connection=getConnection();

    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
}

exports.fetchData=fetchData;
*/
