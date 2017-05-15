const config = {
    authapi: {
        uri: 'http://service-portal.euromonitor.com/AuthApi'
    },
    couchdb: {
        uri: '192.168.46.84:5984',
        username: 'admin',
        pasword: 'password'
    },
    proxy: {
        port: 8000
    }
};

module.exports = config;