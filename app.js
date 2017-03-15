const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const qiniu = require('./qiniu');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.get('/', function(req, res){
   
res.send("success");
});

app.post('/upload', multipartMiddleware, function(req, res){
    Object.keys(req.files).map(function(key){
qiniu.uploadFileToQiniu(req.body.bucket, req.origin, './temImage/1.jpg');
});
res.send(req.body);
});


const server = app.listen(443, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log(host + 'is running on port' + port);
});

