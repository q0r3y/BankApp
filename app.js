'use strict';
require('dotenv').config();

const fs = require('fs');
const express = require('express');
const backupController = require('./controllers/backupController');

class App {
  constructor() {
    console.log(`[*] app.js/constructor: Application started`);
    this.initExpress();
    this.initServer();
    backupController.init();
  }

  initServer() {
    const http = require('http');
    const https = require('https');
    const privateKey = fs.readFileSync('./data/certificates/localhost.key');
    const certificate = fs.readFileSync('./data/certificates/localhost.crt');

    http.createServer(async (req, res) => {
      res.writeHead(301, {
        'Location': `https://${req.headers['host']}${req.url}`,
      });
      res.end();
    }).listen(process.env.PORT || 80);

    https.createServer({
      key: privateKey,
      cert: certificate,
    }, this.expressApp).listen(process.env.PORT || 443);
  }

  initExpress() {
    this.express = express;
    this.expressApp = this.express();
    const session = require('express-session');
    const cookieParser = require('cookie-parser');

    const userRoutes = require('./routes/userRoutes');
    const tellerRoutes = require('./routes/tellerRoutes');
    const publicRoutes = require('./routes/publicRoutes');
    const publicApiRoutes = require('./routes/api/publicApi');
    const privateApiRoutes = require('./routes/api/privateApi');

    this.expressApp.use(express.json());
    this.expressApp.use(this.badJsonHandler());
    this.expressApp.use(cookieParser());
    this.expressApp.use(session({
      secret: process.env.COOKIE_SECRET || 'alienR4realz',
      resave: false,
      saveUninitialized: true,
      cookie: {secure: true},
    }));

    this.expressApp.set('view engine', 'ejs');
    this.expressApp.set('views', __dirname + '/views');
    this.expressApp.use(express.static('views/public'));

    this.expressApp.use('/', publicRoutes);
    this.expressApp.use('/user', userRoutes);
    this.expressApp.use('/teller', tellerRoutes);
    this.expressApp.use('/api/public', publicApiRoutes);
    this.expressApp.use('/api/private', privateApiRoutes);

    this.expressApp.all('*', this.handleInvalidPath());
  }

  // https://stackoverflow.com/a/58165719
  badJsonHandler() {
    return (err, req, res, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        //console.error(err);
        return res.status(400).send({status: 404, message: err.message});
      }
      next();
    };
  }

  // https://medium.com/@SigniorGratiano/express-error-handling-674bfdd86139
  handleInvalidPath() {
    return (req, res, next) => {
      res.status(404).json({
        status: 404,
        message: `Cannot find ${req.originalUrl} on this server!`,
      });
    };
  }
}

{
  new App();
}
