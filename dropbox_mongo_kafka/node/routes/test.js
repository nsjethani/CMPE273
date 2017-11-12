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
            assert.equal(404, res.statusCode);
            done();
        })
    });

    it('Will return main page', function(done) {
        http.get('http://localhost:4003/', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('username and password', function(done) {
        request.post('http://localhost:4003/login', {
            query : {
                username : "asd@asd.com",
                password : "Neha@123"
            }
        }, function(err,res) {
            console.log(res)
            assert.equal(200, res.statusCode);
            done();
        });
    });


    it('file list', function(done) {
        request.post('http://localhost:4003/getfiles', {
            msg : {
                rootdir : "59fa601cfe8f8c15a42cf566"
            }
        }, function(err,res) {
            console.log(res)
            assert.equal(200, res.statusCode);
            done();
        });
    });

});