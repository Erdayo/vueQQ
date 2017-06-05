var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var tmpDatas = '',
    userId = 10001,
    users = [
        {userId: 10000, username: 'jim', password: '123456', online: false},
        {userId: 10001, username: 'mary', password: 'abc123', online: false}
    ],
    usocket = {},
    msgList = [0, 1, 2],
    tmpUser = [],
    tmpMsg;
app.use('/', express.static(__dirname + '/www'));
server.listen(3000);
console.log('server started');

io.on('connection', function (socket) {
    initFunc();
    /*
     * 函数: 初始化
     * 参数:
     * 返回:
     * */
    function initFunc() {
        // 掉线后重新连接发送上次未成功发送的数据
        socket.emit('result', tmpDatas);     // 返回数据
    }

    /*
     * 函数: 注册
     * 参数: 昵称, 密码
     * 返回: 用户ID
     * */
    function register(username, password) {
        userId++;
        users.push({userId: userId, username: username, password: password, online: false});
        socket.emit('registerResult', userId);
    }

    /*
     * 函数: 登录
     * 参数: 用户ID, 密码
     * 返回: 成功/失败
     * */
    function login(userId, password) {
        var getDate = new Date();
        for (var i in  users) {
            if (users[i].userId == userId && users[i].password == password) {
                users[i].online = true;
                socket.userIndex = i;
                usocket[socket.userIndex] = socket;
                socket.emit('loginResult', 'successful');
                userList(); // 默认获取用户列表
                // console.log(getDate.getFullYear() + '年' + (getDate.getMonth() + 1) + '月' + getDate.getDate() + '日' + getDate.getHours() + '时' + getDate.getMinutes() + '分' + ' 用户: ' + users[i].username + ' 已登录');
                return;
            }
        }
        socket.emit('loginResult', 'failure');
    }

    /*
     * 函数: 重新登录
     * 参数: 用户ID, 密码
     * 返回: 成功/失败
     * */
    function reLogin(userId, password) {
        var getDate = new Date();
        for (var i in  users) {
            if (users[i].userId == userId && users[i].password == password) {
                users[i].online = true;
                socket.userIndex = i;
                usocket[socket.userIndex] = socket;
                usocket[socket.userIndex].emit('reLoginResult', 'successful');
                userList(); // 默认获取用户列表
                // console.log(getDate.getFullYear() + '年' + (getDate.getMonth() + 1) + '月' + getDate.getDate() + '日' + getDate.getHours() + '时' + getDate.getMinutes() + '分' + ' 用户: ' + users[i].username + ' 已登录');
                return;
            }
        }
        socket.emit('reLoginResult', 'failure');
    }

    /*
     * 函数: 登出
     * 参数:
     * 返回:
     * */
    function loginOut() {
        if (socket.userIndex != undefined) {
            var getDate = new Date();
            users[socket.userIndex].online = false;
            // console.log(getDate.getFullYear() + '年' + (getDate.getMonth() + 1) + '月' + getDate.getDate() + '日' + getDate.getHours() + '时' + getDate.getMinutes() + '分' + ' 用户: ' + users[socket.userIndex].username + ' 已登出');
        }
    }

    /*
     * 函数: 添加消息显示队列
     * 参数: 下标
     * 返回: 更新消息队列
     * */
    function addMsgList(sub) {
        if (msgList.indexOf(sub) == -1) {
            msgList.push(sub);
        }
    }

    /*
     * 函数: 移除某消息显示
     * 参数: 下标
     * 返回: 更新消息队列
     * */
    function subMsgList(sub) {
        var result = [];
        for (var i = 0; i < msgList.length; i++) {
            if (msgList[i] != sub) {
                result.push(msgList[i]);
            }
        }
        msgList = result.slice();
    }

    /*
     * 函数: 发送用户列表
     * 参数:
     * 返回: 消息队列
     * */
    function userList() {
        socket.emit('userList', users, msgList);
    }

    /*
     * 函数: 消息对话
     * 参数: 用户ID, 信息
     * 返回:
     * */
    function msg(sub, data) {
        // console.log('from ', users[socket.userIndex].username, ' to ' + users[sub - 1].username + ' : ', data);
        if (usocket[sub - 1] == null) {
            return;
        }
        usocket[sub - 1].emit('receiveMsg', data, socket.userIndex);   // 对方
    }

    /*
     * 函数: 获取知乎日报列表/详情
     * 参数: 链接
     * 返回: 知乎日报列表/详情
     * */
    function postUrl(url) {
        tmpDatas = '';
        http.get(url, function (res) {
            var size = 0;
            var chunks = [];
            res.on('data', function (chunk) {
                size += chunk.length;
                chunks.push(chunk);
            });
            res.on('end', function () {
                var datas = Buffer.concat(chunks, size);
                tmpDatas = datas.toString();
                socket.emit('result', tmpDatas);
            });
        }).on('error', function (e) {
            console.log('Got error: ' + e.message);
        });
    }

    /*
     * 函数: 处理请求信息
     * 参数: 请求信息
     * 返回:
     * */
    function handleInfo(req) {
        var type = req.type,
            userId = req.userId,
            username = req.username,
            password = req.password,
            data = req.data,
            url = req.url,
            sub = req.sub;
        switch (type) {
            case 'login':
                login(userId, password);
                break;
            case 'reLogin':
                reLogin(userId, password);
                break;
            case 'register':
                register(username, password);
                break;
            case 'userList':
                userList();
                break;
            case 'msg':
                tmpMsg = data;
                msg(sub, tmpMsg);
                break;
            case 'addMsg':
                addMsgList(sub);
                break;
            case 'subMsg':
                subMsgList(sub);
                break;
            case 'postUrl':
                postUrl(url);
                break;
            default:
                break;
        }
    }

    socket.on('handleInfo', function (req) {
        handleInfo(req);
    });

    socket.on('disconnect', function () {
        loginOut();
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
