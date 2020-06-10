// MPTH: next server for having http and https localhost
// chrome://flags/#allow-insecure-localhost

const fs = require('fs');
const http = require('http');
const https = require('https');
const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let CERT = './internals/localhost.crt';
let KEY = './internals/localhost.key';

const privateKey = fs.readFileSync(KEY, 'utf8');
const certificate = fs.readFileSync(CERT, 'utf8');

const HTTPS_PORT = 443;
const HTTP_PORT = 3000;

const credentials = {
    key: privateKey,
    cert: certificate,
};

const nextAppHandler = (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
        app.render(req, res, '/a', query);
    } else {
        handle(req, res, parsedUrl);
    }
};

app.prepare().then(() => {
    const httpServer = http.createServer(nextAppHandler);
    const httpsServer = https.createServer(credentials, nextAppHandler);

    httpServer.listen(HTTP_PORT, () => {
        console.log(
            `🚀 http application ready on http://localhost:${HTTP_PORT}`,
        );
    });

    httpsServer.listen(HTTPS_PORT, () => {
        console.log(`🚀 https application ready on https://localhost`);
    });
});
