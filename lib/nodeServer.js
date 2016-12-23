
var http = require ('http');
var url = require('url');
var qs = require('querystring');

http.createServer(function (req,res) {
    var query = url.parse(req.url).query;

    var queryObj =qs.parse(query);
    console.log(queryObj);

    var resultData = '';

    console.info();
    console.log(queryObj.myUrl);
    console.info();

    http.get(queryObj.myUrl,function (request) {
        request.setEncoding('utf8');
        request.on('data',function (result) {
            resultData += result;
        });

        request.on('end',function () {
            var str = queryObj.callback + "(" + JSON.stringify(resultData) + ")";

            // if (/^undefined/.test(str)) {
            //     str = str.replace("undefined(", "");
            //     str = str.replace(/\)$/, "");
            // }
            if(str){
                res.end(str);
                console.log(str);
            }else{
                res.end('没有数据');
            }


        });

    }).on('error',function (e) {
        res.end(e);
    });

}).listen(5000);
console.log('端口号5000已经启动');