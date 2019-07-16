"use strict";
exports.__esModule = true;
var express = require("express");
var request = require("request");
var Core = /** @class */ (function () {
    function Core(port) {
        this.exchanges = [
            { "name": 'coindesk', "url": "https://api.coindesk.com/v1/bpi/currentprice/btc.json", "path": 'bpi.USD.rate', "rate": "" },
            { "name": 'blockchain', "url": "https://blockchain.info/ticker", "path": 'USD.last', "rate": "" },
            { "name": 'coinbase', "url": "https://api.coinbase.com/v2/prices/spot?currency=USD", "path": 'data.amount', "rate": "" },
            { "name": 'bitstamp', "url": "https://www.bitstamp.net/api/v2/ticker/btcusd/", "path": 'last', "rate": "" },
        ];
        this.port = port;
    }
    Core.prototype.getRates = function () {
        var _loop_1 = function (exchange) {
            request.get(exchange.url, function (error, response, body) {
                if (error) {
                    console.log(error);
                }
                else {
                    body = JSON.parse(body);
                    exchange.rate = core.formatPath(exchange.path, body);
                    exchange.rate = exchange.rate.toString().replace(',', '');
                    console.log(exchange.name + ": " + exchange.rate);
                }
            });
        };
        for (var _i = 0, _a = this.exchanges; _i < _a.length; _i++) {
            var exchange = _a[_i];
            _loop_1(exchange);
        }
    };
    Core.prototype.formatPath = function (path, obj) {
        return path.split('.').reduce(function (prev, curr) {
            return prev ? prev[curr] : null;
        }, obj || self);
    };
    Core.prototype.onStart = function () {
        var _this = this;
        var app = express();
        app.listen(this.port, function () {
            console.log("Server started | " + _this.port);
        });
    };
    ;
    return Core;
}());
var core = new Core(3000);
setInterval(function () {
    core.getRates();
}, 1000);
core.onStart();
//Average rage
//Socket
