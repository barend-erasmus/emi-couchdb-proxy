const http = require('http');
const httpProxy = require('http-proxy');
const config = require('./config');
const authGateway = require('./auth-gateway');

const proxy = httpProxy.createProxyServer({
    target: `http://${config.couchdb.uri}`
});

const server = http.createServer((req, res) => {
    const jwt = getJWTFromRequest(req);
    if (jwt !== null) {

        authGateway.validate(jwt).then((result) => {

            if (result === true) {
                setAuthorizationHeaderForCouchDb(req);
                proxy.web(req, res);
            } else {
                sendInvalidJWTResponse(res);
            }
        }).catch((err) => {
            sendInvalidJWTResponse(res);
        })

        return;
    }

    sendInvalidJWTResponse(res);
});

function sendInvalidJWTResponse(res) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
        message: 'Invalid jwt.'
    }));
    res.end();
}

function setAuthorizationRequestHeaderForCouchDb(req) {
    const auth = 'Basic ' + new Buffer(`${config.couchdb.username}:${config.couchdb.pasword}`).toString('base64');
    req.headers['Authorization'] = auth;
}

function getJWTFromRequest(req) {
    const jwt = req.headers['emijwt'];
    if (jwt === null || jwt === undefined) {
        return null;
    }

    return jwt;
}

console.log(`listening on port ${config.proxy.port}`)
server.listen(config.proxy.port);

