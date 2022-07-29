//CORE
const { readFile } = require('fs/promises');

//Packages
const express = require("express");

//Helpers
const BitcoinSingleton = require('../helpers/bitcoinSingleton');
const PortfolioSingleton = require('../helpers/portfolioSingleton');
const CodeSnippetSingleton = require('../helpers/codeSnippetsSingleton');
const ClientRegistry = require('../helpers/registerClient');

//Router
const router = express.Router();

//Bitcoin Price
router.get('/btc_usd', async (req, res) => {
    try {
        console.log('route hit')
        return res.status(201).json({ success: true, data: BitcoinSingleton.getPrice() });
    } catch (error) {
        console.error(error)
        return res.status(201).json({ success: false });
    }
});

//Bitcoin Price
router.get('/notification', async (req, res) => {
    try {
        await ClientRegistry.register(req.query.user_id, res);
    } catch (error) {
        console.error(error)
        return res.status(201).json({ success: false });
    }
});

//Load Portfolio
router.get('/portfolio', async (req, res) => {
    try {
        setTimeout(() => {
            return res.status(201).json({
                success: true,
                data: PortfolioSingleton.getPortfolio
            });
        }, 250);
    } catch (error) {
        console.error(error)
        return res.status(201).json({ success: false });
    }
});

//Paginate Code Snippets
router.get('/code/snippets', async (req, res) => {
    try {
        setTimeout(() => {
            return res.status(201).json({
                success: true,
                data: CodeSnippetSingleton.getCodeSnippetsByPage(req.query.category, req.query.page)
            });
        }, 250);
    } catch (error) {
        console.error(error)
        return res.status(201).json({ success: false });
    }
});

//Download resume
router.get('/resume', async (req, res) => {
    try {
        res.set({
            'Content-Disposition': `attachment; filename='Miles_Falk_Resume'`,
            'Content-Type': 'application/pdf'
        })

        return res.status(201).send(await readFile(`${__dirname}/../../public/resume.pdf`));
    } catch (error) {
        console.error(error)
        return res.status(201).json({ success: false });
    }
});


//
module.exports = router;