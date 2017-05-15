const request = require('request');
const config = require('./config');

function validate(token) {
    return new Promise((resolve, reject) => {
        request
            .get(`${config.authapi.uri}/validate/token?token=${token}&format=json`,
            (err, response, body) => {
                if (response.statusCode === 200) {
                    resolve(JSON.parse(body));
                } else {
                    reject();
                }
            })
    });
}

module.exports = {
    validate
};