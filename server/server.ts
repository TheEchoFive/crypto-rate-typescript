import * as express from 'express';
import * as request from 'request';
import {App} from '../types';

class Core implements App {

    public port: number;
    public exchanges: { name:string, url:string, path:string, rate: string }[] = [
        { "name": 'coindesk', "url": "https://api.coindesk.com/v1/bpi/currentprice/btc.json", "path": 'bpi.USD.rate', "rate": "" },
        // { "name": 'blockchain', "url": "https://blockchain.info/ticker", "path": 'USD.last', "rate": "" },
        // { "name": 'coinbase', "url": "https://api.coinbase.com/v2/prices/spot?currency=USD", "path": 'data.amount', "rate": "" },
        // { "name": 'bitstamp', "url": "https://www.bitstamp.net/api/v2/ticker/btcusd/", "path": 'last', "rate": "" },
        // { "name": 'bitpay', "url": "https://bitpay.com/api/rates", "path": 'bitpay[2].rate', "rate": "" }
    ];

    constructor(port:number) {
        this.port = port;
    }

    getRates() {
       for (const exchange of this.exchanges) {
        request.get(exchange.url,function(error,response,body){
            body = JSON.parse(body);
            console.log(body);
            //exchange.rate = this['body.'+ exchange.path]; 
            //exchange.rate = exchange.rate.replace(',', '')
            console.log(exchange.rate); 
        })
    }
    }

    onStart(){
        const app = express();
        app.listen(this.port, () => {
            console.log(`Server started | ${this.port}`); 
        });
    };

}
let core = new Core(3000);
core.getRates();
core.onStart();