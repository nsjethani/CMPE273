/**
 * New node file
 */
var request = require('request'),
    express = require('express'),
    assert = require("assert"),
    http = require("http");

describe('URL Tests', function() {

    it('check whether URL exist or not', function(done) {
        http.get('http://localhost:4003/helo', function(res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(404, res.statusCode);
            done();
        })
    });

    it('Will return main page', function(done) {
        http.get('http://localhost:4003/', function(res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('valid username and password', function(done) {
        request.post('http://localhost:4003/login', {
            form : {
                username : "asd@asd.com",
                password : "Neha@123"
            }
        }, function(err,res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('invalid username and password', function(done) {
        request.post('http://localhost:4003/login', {
            form : {
                username : "Neha@asd.com",
                password : "Neha@123"
            }
        }, function(err,res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(401, res.statusCode);
            done();
        });
    });

    it('invalid username and password', function(done) {
        request.post('http://localhost:4003/login', {
            form : {
                username : "asd@asd.com",
                password : "neha@123"
            }
        }, function(err,res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(401, res.statusCode);
            done();
        });
    });

    it('file list', function(done) {
        request.post('http://localhost:4003/getfiles', {
            form : {
                dir : "59fa601cfe8f8c15a42cf566"
            }
        }, function(err,res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('Successful signup', function(done) {
        request.post('http://localhost:4003/signup/doSignup', {
            form : {
                fname : "AASS",
                lname : "SSAA",
                email : "aas@aass.com",
                passws: "Neha@123"
            }
        }, function(err,res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('unable to sign up, user already exist', function(done) {
        request.post('http://localhost:4003/signup/doSignup', {
            form : {
                fname : "AASS",
                lname : "SSAA",
                email : "aass@aass.com",
                passws: "Neha@123"
            }
        }, function(err,res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(401, res.statusCode);
            done();
        });
    });

    it('Display user profile', function(done) {
        request.post('http://localhost:4003/fetchUserProfile ', {
            form : {
                id:'59fa601cfe8f8c15a42cf566'
            }
        }, function(err,res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('Will give user logs', function(done) {
        request.post('http://localhost:4003/getlogs ', {
            form : {
                id:'59fa601cfe8f8c15a42cf566'
            }
        }, function(err,res) {
            console.log("Status code is :",res.statusCode)
            assert.equal(200, res.statusCode);
            done();
        });
    });

});