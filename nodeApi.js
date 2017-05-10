var http = require('http');
http.get('http://news-at.zhihu.com/api/4/news/latest',function (res) {
    var size = 0;
    var chunks = [];
    res.on('data',function (chunk) {
        size += chunk.length;
        chunks.push(chunk);
    });
    res.on('end',function () {
        var data = Buffer.concat(chunks,size);
        var server = http.createServer(function (req,res) {
            res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"});
            res.write(data.toString());
            res.end();
        });
        server.listen(8081,function () {
            console.log('start');
        })
    });
}).on('error',function (e) {
    console.log('Got error: ' + e.message);
});









