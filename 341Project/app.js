var express = require('express');
var app = express();
var path = require('path');
var port = 1337; //port for the app to listen

app.use('/scripts', express.static(__dirname + '/public/scripts'));

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.get('/test', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/pages/test.html'));
});

app.get('/patientsearch', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/pages/patientsearch.html'));
});

app.get('/patientedit', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/pages/patientedit.html'));
});

app.get('/physiciansearch', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/pages/physiciansearch.html'));
});

app.get('/nursesearch', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/pages/nursesearch.html'));
});

app.get('/studysearch', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/pages/studysearch.html'));
});

app.get('/appointmentsearch', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/pages/appointmentsearch.html'));
});

//CONNECT TO THE DATABASE

//var stc = require('./sshtunnelconnect');
const mysqlssh = require('mysql-ssh');
const fs = require('fs');

mysqlssh.connect(
    {
        host: '129.22.47.205',
        user: 'jswise',
        password: 'whyoyacob2#'
        //privateKey: 'whyoyacob2#'//fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
    },
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'healthcare_mgnt_sys'
    }
)
    .then(client => {
        client.query('SELECT * FROM `carecenter`', function (err, results, fields) {
            if (err) throw err
            console.log(results);
            mysqlssh.close()
        })
    })
    .catch(err => {
        console.log(err)
    })

//LISTEN

app.listen(port, function () {
    console.log("listening on port " + port);
});