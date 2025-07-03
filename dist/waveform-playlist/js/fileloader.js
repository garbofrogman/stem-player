const fs = require('fs');
let files = fs.readdirSync('../media/audio/Weezer/');

fs.readdir('../media/audio/Weezer/', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  // Do something with the files
});

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
				// res.end(printTracks());	// this is for the web page.
        // document.getElementById('tracklist').innerHTML = files
			  res.end(`<html>
			   <body>` + files + `
			   </body>
			   </html>`);

				console.log(msg); // this is to show in the server console.
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

function test() {
  return 'hello woild';
}

function printTracks() {
  var allfiles = '';
  let files = fs.readdirSync('../media/audio/Weezer/');
  console.log("cliccicked");
  files.forEach(file => {
    console.log(file);
    // return '<!DOCTYPE html> <html><body> ' + allfiles + '</body></html>';

    return allfiles
  });
}
