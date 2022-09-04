//Packages
const ccxt = require("ccxt");

//Client registry
const ClientRegistry = require('./registerClient');

//Initiate kraken
const kraken = new ccxt.kraken();

//
class BitcoinSingleton {

    //Current bitcoin ticker price
    btc_usd_interval

    //Price trend
    btc_usd_trend;

    //Current btc usd price
    btc_usd_price = 0;

    constructor() {
        (async () => {
            try {
                await this.fetchBitcoinPrice();

                this.btc_usd_interval = setInterval(async () => await this.fetchBitcoinPrice(), (1000 * 20)); //Every 20 seconds
            } catch (error) {
                clearInterval(this.btc_usd_interval);
                throw new Error(error);
            }
        })();
    }

    //Get current bitcoin price
    get getPrice() {
        return { price: this.btc_usd_price, trend: this.btc_usd_trend };
    }

    async fetchBitcoinPrice() {
        try {
            const ticker = await kraken.fetch_ticker("BTC/USDT");

            if (ticker.close > this.btc_usd_price) this.btc_usd_trend = 1;
            else if (ticker.close < this.btc_usd_price) this.btc_usd_trend = -1;

            //Only continue if price changed OR price has never been assigned
            if (this.btc_usd_price !== ticker.close) {

                this.btc_usd_price = ticker.close;

                //Inform all registered clients of BTC/USD price change
                for (let client in ClientRegistry.clients) {
                    ClientRegistry.clients[client].write(`event: btcPriceChange\n`);
                    ClientRegistry.clients[client].write(`data: ${JSON.stringify({ price: this.btc_usd_price, trend: this.btc_usd_trend || 1 })}\n\n`);
                }
            }

        } catch (error) {
            console.error(error);

            //
            setTimeout(async () => await this.fetchBitcoinPrice(), 90_000) //Retry connection after 90 seconds
        }
    }

}

module.exports = new BitcoinSingleton();