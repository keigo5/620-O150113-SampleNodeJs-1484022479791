var http = require('http');
//HTMLのフォームから渡ってくるようなデータをパースするとき使うモジュール
var querystring = require('querystring');

http.createServer(function handler(req, res) {
    //postPageで、POSTリクエストだったら
    if (req.url === '/postPage' && req.method === 'POST') {
        var data = '';
        //readableイベントが発火したらデータにリクエストボディのデータを追加
        req.on('readable', function(chunk) {
            data += req.read();
        });
        //リクエストボディをすべて読み込んだらendイベントが発火する。
        req.on('end', function() {
            //パースする
            querystring.parse(data);
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found!!');
    }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
