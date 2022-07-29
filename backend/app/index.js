//Packages
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const favicon = require('serve-favicon');

//Core
const path = require('path');
const http = require('http');
const fs = require('fs');

//Helpers
require('./helpers/bitcoinSingleton');
require('./helpers/portfolioSingleton');

//Routes
const publicRoutes = require('./routes/publicRoutes');

//Environment
process.env.NODE_ENV = 'dev';

//Setup express
const app = express();

//Serve favicon
app.use(favicon(path.join(__dirname, '../', 'public', 'app', 'favicon.ico')));

//Serve production app
app.use('/assets', express.static(path.join(__dirname, '../', 'public', 'app', 'assets')));
app.use('/public/app', express.static(path.join(__dirname, '../', 'public', 'app')));

//Use Middleware
// app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(cors());
// app.use(compression());
app.use(morgan(process.env.NODE_ENV));

app.disable('x-powered-by');

app.use(express.json());

app.get('/', (req, res) => {
    res.setHeader(`content-type`, 'text/html');
    fs.createReadStream(path.join(__dirname, '../', 'public', 'app', 'index.html')).pipe(res)
})

//Public routes
app.use('/api', publicRoutes);

//Frontend routes
app.get('*', (req, res) => {
    res.setHeader(`content-type`, 'text/html');
    fs.createReadStream(path.join(__dirname, '../', 'public', 'app', 'index.html')).pipe(res)
})

//Handle errors
app.use((req, res, next) => {
    let error = new Error("Page Not Found");
    error.status = 404;
    error.message = "Page Not Found";

    //Send error
    next(error);
});

//Handle errors
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: { message: error }
    });
});

//Create server
http.createServer(app).listen((process.env.PORT || 2022), () => console.log(`Listing on port http://localhost:${process.env.PORT || 2022}/`));