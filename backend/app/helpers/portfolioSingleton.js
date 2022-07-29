//CORE
const { readFile } = require('fs/promises');

//
class PortfolioSingleton {

    //Hold all portfolio posts
    portfolio_posts;

    constructor() {
        (async () => {
            try {
                //Parse portfolio
                this.portfolio_posts = JSON.parse(await readFile(`${__dirname}/../consts/portfolio.json`, "utf8"));
            } catch (error) {
                throw new Error(error);
            }
        })();
    }

    get getPortfolio() {
        return this.portfolio_posts;
    }

}

module.exports = new PortfolioSingleton();