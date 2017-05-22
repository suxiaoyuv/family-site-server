var express = require('express');
var multer = require('multer');
var fs = require('fs');

var app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/vagrant/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage }).any();

app.use(function (req, res, next) {
    console.log('app', req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            res.send('error');
        } else {
            console.log('upload files', req.files);
            res.send('success');
        }
    });
});

app.listen(5000, function () {
    console.log('app listening on port 5000!');
});