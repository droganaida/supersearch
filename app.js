var express = require('express');
var app = express();
var path = require('path');
var cluster = require('cluster');
var http = require('http');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module);
var myconfig = require('./libs/myconfig');

if (cluster.isMaster) {

    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i += 1) {
        cluster.schedulingPolicy = cluster.SCHED_NONE;
        cluster.fork();
    }

    cluster.on('exit', function (worker) {
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });

} else {

    app.set('views', __dirname + '/templates');
    app.set('view engine', 'jade');
    app.set('view options', {compileDebug: false, self: true, cache: true});

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(express.static(path.join(__dirname, 'public')));

    require('./routes')(app);

    app.use(function(req, res, next){
        res.locals.title = '404 Упс... Ничего-то тут и нет';
        res.status(404).render('./error/error', {errorCode: 404, errorText: 'Страница не найдена'});
    });


    var httpServer = http.createServer(app);

    function onListening(){
        log.info('Висим на порту %d', myconfig.port);
    }

    httpServer.on('listening', onListening);
    httpServer.listen(myconfig.port, '127.0.0.1');

}