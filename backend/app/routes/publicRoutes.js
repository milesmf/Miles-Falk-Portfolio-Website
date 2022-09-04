//CORE
const { readFile } = require('fs/promises');

//Packages
const express = require("express");

//Helpers
const BitcoinSingleton = require('../helpers/bitcoinSingleton');
const PortfolioSingleton = require('../helpers/portfolioSingleton');
const ProjectsSingleton = require('../helpers/projectsSingleton');
const ClientRegistry = require('../helpers/registerClient');

//Router
const router = express.Router();

//Bitcoin price
router.get('/btc_usd', async (req, res) => {
    try {
        return res.status(201).json({ success: true, data: BitcoinSingleton.getPrice });
    } catch (error) {
        console.error(error)
        return res.status(201).json({ success: false });
    }
});

//Register incoming clients to later serve BTC price with SSE
router.get('/notification', async (req, res) => {
    try {
        await ClientRegistry.register(req.query.user_id, res);
    } catch (error) {
        console.error(error)
        return res.status(201).json({ success: false });
    }
});

//Load portfolio
router.get('/portfolio', async (req, res) => {
    try {
        return res.status(201).json({
            success: true,
            data: PortfolioSingleton.getPortfolio
        });
    } catch (error) {
        console.error(error)
        return res.status(201).json({ success: false });
    }
});

//Load projects
router.get('/projects', async (req, res) => {
    try {
        return res.status(201).json({
            success: true,
            data: ProjectsSingleton.getProjects
        });
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