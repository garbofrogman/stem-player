var fs = require('fs');
let files = fs.readdirSync('../media/audio/Weezer/');

var http = require('http');

http.createServer( function(req, res) {
    if (req.method == 'POST') {
		var msg = '';
        req.on('data', function (data) {
            msg += data;
        });
        req.on('end', function () {
			if(msg === 'button=1') {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(printTracks());	// this is for the web page.
				console.log('success'); // this is to show in the server console.
			}
			else if(msg === 'button=2') {
				res.writeHead(200, {'Content-Type': 'text/html'});
				// res.end(files);	// this is for the web page.
        // document.getElementById('tracklist').innerHTML = files
				console.log(files); // this is to show in the server console.
			}
			else {
				res.writeHead(400, {'Content-Type': 'text/html'});
				res.end('unexpected message (POST request) received: ' + msg);					
			}
        });
    } else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(`<html>
			<body>
				As you requested, you should start with your static HTML file instead of browsing the URL directly.
			</body>
			</html>`);
	}
}).listen(8081);
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   console.log(files);
//   res.end('Hello World!');
// }).listen(8080);

function test() {
  return 'hello woild';
}

function printTracks() {
  var allfiles = '';
  files.forEach(file => {
    console.log(file);
    return '<DOCTYPE html> <html><body> ' + allfiles + '</body></html>';
  });
}
