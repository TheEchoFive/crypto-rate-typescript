"use strict";
exports.__esModule = true;
var express = require("express");
var request = require("request");
var Core = /** @class */ (function () {
    function Core(port) {
        this.port = port;
    }
    Core.prototype.sendRequest = function (uri, callback) {
        return request.get(uri, callback);
    };
    Core.prototype.onStart = function () {
        var app = express();
        app.listen(this.port, function () {
            console.log('server started');
        });
    };
    ;
    return Core;
}());
var core = new Core(3000);
core.sendRequest('https://api.coindesk.com/v1/bpi/currentprice/btc.json', function (error, response, body) {
    var coindesk = JSON.parse(body);
    console.log(coindesk.bpi.USD.rate);
});
core.onStart();
// https://api.coindesk.com/v1/bpi/currentprice/btc.json
//  exchanges.coindesk.bpi.USD.rate
// https://blockchain.info/ticker
//exchanges.blockchain.USD.last
//https://api.coinbase.com/v2/prices/spot?currency=USD
//exchanges.coinbase.data.amount);
// https://www.bitstamp.net/api/v2/ticker/btcusd/
// exchanges.bitstamp.last
// https://bitpay.com/api/rates
// exchanges.bitpay[2].rate
