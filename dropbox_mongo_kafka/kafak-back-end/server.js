var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var sign_up = require('./services/signup');
var file_upload = require('./services/file_upload')
var userlog = require('./services/userlogs')
var getfiles = require('./services/getfiles')
var createdir = require('./services/createdir')
var deletefile = require('./services/deletefile')

var topic_name = 'login_topic';
var topic_signup = 'signup_topic';
var topic_file_upload = 'upload_topic'
var topic_userlogs = 'userlogs_topic'
var topic_getfiles = 'getfiles_topic'
var topic_createdir = 'createdir_topic'
var topic_deletefile = 'deletefile_topic'

var consumer = connection.getConsumer(topic_name);
var consumer_signup = connection.getConsumer(topic_signup);
var consumer_file_upload = connection.getConsumer(topic_file_upload);
var consumer_userlogs = connection.getConsumer(topic_userlogs);
var consumer_getfiles = connection.getConsumer(topic_getfiles);
var consumer_createdir = connection.getConsumer(topic_createdir);
var consumer_deletefile = connection.getConsumer(topic_deletefile)
var producer = connection.getProducer();

console.log('server is running');

console.log("Consumer is ", consumer.payloads)

consumer.on('message', function (message) {
    console.log('message received');
    console.log('received message is ',JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    login.handle_request(data.data, function(err,res){
        console.log('after handle',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_signup.on('message', function (message) {
    console.log('message received in sign up');
    console.log('received message in sign up',JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    sign_up.handle_signup(data.data, function(err,res){
        console.log('after handle sign up',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Sending response from consumer_signup",data);
        });
        return;
    });
});

consumer_userlogs.on('message', function (message) {
    console.log('message received in user logs');
    console.log('received message in file upload',JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    userlog.userlogs(data.data, function(err,res){
        console.log('after handle file upload',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_file_upload.on('message', function (message) {
    console.log('message received in file upload');
    console.log('received message in file upload',JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    file_upload.fileupload(data.data, function(err,res){
        console.log('after handle file upload',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_getfiles.on('message', function (message) {
    console.log('message received in get files');
    console.log('received message in get files',JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    getfiles.FileList(data.data, function(err,res){
        console.log('after getting files back',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_createdir.on('message', function (message) {
    console.log('received message in create directory',JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    createdir.createdir(data.data, function(err,res){
        console.log('after getting files back',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_deletefile.on('message', function (message) {
    console.log('received message in delete file',JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    deletefile.deleteFile(data.data, function(err,res){
        console.log('after getting files back',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});
