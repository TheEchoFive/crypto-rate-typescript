"use strict";
exports.__esModule = true;
var express = require("express");
var request = require("request");
var Core = /** @class */ (function () {
    function Core(port) {
        this.exchanges = [
            { "name": 'coindesk', "url": "https://api.coindesk.com/v1/bpi/currentprice/btc.json", "path": 'bpi.USD.rate', "rate": "" },
        ];
        this.port = port;
    }
    Core.prototype.getRates = function () {
        var _loop_1 = function (exchange) {
            request.get(exchange.url, function (error, response, body) {
                body = JSON.parse(body);
                console.log(body.bpi.USD.rate);
                exchange.rate = this['body.' + exchange.path];
                // exchange.rate = exchange.rate.replace(',', '')
                console.log(exchange.rate);
            });
        };
        for (var _i = 0, _a = this.exchanges; _i < _a.length; _i++) {
            var exchange = _a[_i];
            _loop_1(exchange);
        }
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
core.getRates();
core.onStart();
