import * as express from 'express';
import * as request from 'request';
import {App} from '../types';
import { json } from 'body-parser';

class Core implements App {

    public port: number;

    constructor(port:number) {
        this.port = port;
    }

    sendRequest(uri: string, callback?: (error: any, response: request.Response, body: any) => void): request.Request {
       return request.get(uri, callback)
    }

    onStart(){
        const app = express();
        app.listen(this.port, () => {
            console.log('server started'); 
        });
    };

}
let core = new Core(3000);
core.sendRequest('https://api.coindesk.com/v1/bpi/currentprice/btc.json', function(error, response, body){
    let coindesk = JSON.parse(body)
    console.log(coindesk.bpi.USD.rate);
   })

   
core.onStart();

//exchanges.coindesk = exchanges.coindesk.replace(',', '')
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
