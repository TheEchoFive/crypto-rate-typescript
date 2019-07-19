"use strict";
exports.__esModule = true;
var express = require("express");
var request = require("request");
var SocketIO = require("socket.io");
var path = require("path");
var http = require("http");
var Core = /** @class */ (function () {
    function Core(port) {
        this.app = express();
        this.publicPath = path.join(__dirname, '../public');
        this.server = http.createServer(this.app);
        this.io = SocketIO(this.server);
        this.exchanges = [
            { "name": 'coindesk', "url": "https://api.coindesk.com/v1/bpi/currentprice/btc.json", "path": 'bpi.USD.rate', "rate": "" },
            { "name": 'blockchain', "url": "https://blockchain.info/ticker", "path": 'USD.last', "rate": "" },
            { "name": 'coinbase', "url": "https://api.coinbase.com/v2/prices/spot?currency=USD", "path": 'data.amount', "rate": "" },
            { "name": 'bitstamp', "url": "https://www.bitstamp.net/api/v2/ticker/btcusd/", "path": 'last', "rate": "" },
        ];
        this.port = port;
    }
    Core.prototype.getRates = function () {
        var _this = this;
        var _loop_1 = function (exchange) {
            new Promise(function (resolve, reject) {
                request.get(exchange.url, function (error, response, body) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = JSON.parse(body);
                        exchange.rate = core.formatPath(exchange.path, body);
                        exchange.rate = exchange.rate.toString().replace(',', '');
                        resolve(exchange);
                    }
                });
            });
        };
        for (var _i = 0, _a = this.exchanges; _i < _a.length; _i++) {
            var exchange = _a[_i];
            _loop_1(exchange);
        }
        Promise.all([]).then(function () {
            console.log("" + _this.exchanges[0].name);
            console.log("" + _this.exchanges[0].rate);
            console.log("" + _this.exchanges[1].name);
            console.log("" + _this.exchanges[1].rate);
            console.log("" + _this.exchanges[2].name);
            console.log("" + _this.exchanges[2].rate);
            console.log("" + _this.exchanges[3].name);
            console.log("" + _this.exchanges[3].rate);
            _this.io.emit('rates', _this.exchanges);
            console.log('Send!');
        });
    };
    Core.prototype.formatPath = function (path, obj) {
        return path.split('.').reduce(function (prev, curr) {
            return prev ? prev[curr] : null;
        }, obj || self);
    };
    Core.prototype.Socket = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            console.log("User connected");
            socket.emit('rates', _this.exchanges);
            socket.on('disconnect', function () {
                console.log("User disconnected");
            });
        });
    };
    Core.prototype.onStart = function () {
        var _this = this;
        core.Socket();
        this.app.use(express.static(this.publicPath));
        this.server.listen(this.port, function () {
            console.log("Server started | " + _this.port);
        });
    };
    ;
    return Core;
}());
var core = new Core(3000);
setInterval(function () {
    core.getRates();
}, 10000);
core.onStart();
