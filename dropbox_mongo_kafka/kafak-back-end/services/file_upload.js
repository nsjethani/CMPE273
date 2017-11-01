var mongo = require('./mongo')
var userlog = require('./userlogs')
var fs = require('fs');
var Duplex = require('stream').Duplex;
var streambuffers = require('stream-buffers')
function fileupload(msg, callback)
/*{
callback(msg)
}*/

{
    var res = {};
    console.log("Neha Jethani ")
  //console.log("In file upload:" ,msg.buffer);
    console.log("type of msg.buffer ",typeof msg.buffer)
    var file_data = new Buffer(msg.buffer)
    //var my_data = Buffer.from('Neha Jethani')
    console.log("Created buffer ",Buffer.isBuffer(file_data))
    //var file_data = new Buffer(msg.buffer,'ascii')

    /*for (var i = 0; i < msg.buffer.length; i++) {
        file_data[i] = msg.buffer[i];
    }*/

    var upload_path = msg.filedata.path + '/' +msg.filedata.filename

    console.log("Upload path ",upload_path)

/*
    var myReadableStreamBuffer = new streambuffers.ReadableStreamBuffer({
        frequency: 10,      // in milliseconds.
        chunkSize: 2048     // in bytes.
    });

    myReadableStreamBuffer.put(file_data);
*/

    /*

       console.log("file data ",typeof file_data)
       console.log("msg.buffer ",typeof msg.buffer)

   let readStream = new stream();
   readStream.end(file_data);
*/



        var wstream = fs.createWriteStream(upload_path);
        wstream.write(file_data);
        wstream.end();


//console.log("My data ", my_data)
/*
    let stream = new Duplex();
    stream.push(my_data);
     stream.push(null);
     stream.pipe(upload_path)
*/


 //   fs.writeFileSync(upload_path,file_data,'utf8')

   /* fs.open(upload_path, 'w', function(err, fd) {
        if (err) {
            throw 'could not open file: ' + err;
        }

        // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
        fs.write(fd, file_data, 0, file_data.length, null, function(err) {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, function() {
                console.log('wrote the file successfully');
            });
        });
    });*/
    //console.log("File Data ",file_data)
   console.log("Encoding type is ",msg.encoding)



   /* fs.writeFile(upload_path,file_data,function (err) {
        if(err){
            console.log("Error in file upload ",err)
            res.status = '401';
            res.message = 'error in saving file'
            callback(null, res)
        }
        else
            console.log("File is saved")
    })
*/
   /* msg.buffer.mv(upload_path, function (err) {
        if(err)
            console.log("Could not upload file")
    })*/

    userlog.userlogs(msg.logdata, function (err, results) {
        if (err) {
            console.log("Error in inserting logs while file upload")
            res.status = '401';
            res.message = 'error in userlogs in file upload'
        }
    })
        mongo.insertDocument('filedata', msg.filedata, function (err, results) {
            if (err) {
                console.log("Error in inserting filedata while file upload")
                res.status = '401';
                res.message = 'error in filedata'
            }
            else
            {
                res.status='201'
                res.message='File uploaded'
            }
            callback(null, res)
        }
);
}
exports.fileupload = fileupload;

