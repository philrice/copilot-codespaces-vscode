// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// create server
http.createServer(function(request, response){
    // get request url
    var path = url.parse(request.url, true).pathname;
    if(path === '/'){
        // read html file
        fs.readFile('comment.html', 'utf8', function(error, data){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    } else if(path === '/comment'){
        if(request.method === 'POST'){
            // create variable to save post data
            var body = '';
            // get post data
            request.on('data', function(data){
                body += data;
            });
            // get post data
            request.on('end', function(){
                var post = qs.parse(body);
                // response to client
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(JSON.stringify(post));
            });
        }
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('404 Not Found');
    }
}).listen(52273, function(){
    console.log('Server Running at http:// localhost:52273');
}
);