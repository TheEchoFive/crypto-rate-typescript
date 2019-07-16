import * as express from 'express';
import * as request from 'request';
import {App} from '../types';

class Core implements App {

    public port: number;
    
    public exchanges: { name:string, url:string, path:string, rate: string}[] = [
        { "name": 'coindesk', "url": "https://api.coindesk.com/v1/bpi/currentprice/btc.json", "path": 'bpi.USD.rate', "rate": "" },
        { "name": 'blockchain', "url": "https://blockchain.info/ticker", "path": 'USD.last', "rate": "" },
        { "name": 'coinbase', "url": "https://api.coinbase.com/v2/prices/spot?currency=USD", "path": 'data.amount', "rate": "" },
        { "name": 'bitstamp', "url": "https://www.bitstamp.net/api/v2/ticker/btcusd/", "path": 'last', "rate": "" },
    ];

    constructor(port:number) {
        this.port = port;
    }

    getRates() {
       for (const exchange of this.exchanges) {
            request.get(exchange.url,function(error,response,body){
                if (error) {
                 console.log(error);        
                } else {                   
                    body = JSON.parse(body); 
                    exchange.rate = core.formatPath(exchange.path,body);     
                    exchange.rate = exchange.rate.toString().replace(',','')
                    console.log(`${exchange.name}: ${exchange.rate}`);
                }     
            })
        }    
    }

    formatPath(path: string, obj: object) {
        return path.split('.').reduce(function(prev: any, curr: any) {
            return prev ? prev[curr] : null
        }, obj || self)
    }

    onStart(){
        const app = express();
        app.listen(this.port, () => {
            console.log(`Server started | ${this.port}`); 
        });
    };
}
let core = new Core(3000);

setInterval(()=> {
core.getRates();
},1000)

core.onStart();

//Average rage
//Socket