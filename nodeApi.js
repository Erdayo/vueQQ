var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var id = 0;
var tmpDatas = '';
app.use('/', express.static(__dirname + '/www'));
server.listen(3000);
console.log('server started');

io.on('connection', function (socket) {
    console.log('connection success!');
    var strs = [];
    // 掉线后重新连接发送上次的数据
    // console.log(tmpDatas);
    socket.emit('result', tmpDatas);
    socket.on('postUrl', function (data) {
        console.log(data);
        tmpDatas = '';
        http.get(data, function (res) {
            var size = 0;
            var chunks = [];
            res.on('data', function (chunk) {
                size += chunk.length;
                chunks.push(chunk);
            });
            res.on('end', function () {
                var datas = Buffer.concat(chunks, size);
                tmpDatas = datas.toString();
                // console.log(tmpDatas);
                socket.emit('result', tmpDatas);
            });
        }).on('error', function (e) {
            console.log('Got error: ' + e.message);
        });
    });
    socket.on('disconnect', function () {
        console.log('disconnect...');
    });
});



/*
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
 */
