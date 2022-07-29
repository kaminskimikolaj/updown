var http = require('http');
var path = require('path');
var fileSystem = require('fs');
http.createServer(function(request, response) {
    console.log(request.connection.remoteAddress)
//    var filename = "stonks.exe"
    var filename = "outerbankss02e01.mp4" 
    var filePath = path.join(__dirname, filename);
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Length': stat.size,
    	"Content-Type": "application/octet-stream",
	'Content-disposition': 'attachment; filename=' + filename
    });

    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(response);
})
.listen(7272);
console.log("server is running on 7272 port");

