const PouchDB = require('pouchdb');

const db = new PouchDB(`http://127.0.0.1:${config.proxy.port}/test`, {
    ajax: {
        headers: {
            emijwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJldXJvbW9uaXRvci1qd3QiLCJpYXQiOjE0OTQ4MzczMjIsImV4cCI6MTQ5NTQ0MjEyMiwicHJlZmVycmVkX3VzZXJuYW1lIjoiQ29ycG9yYXRlIFBhc3Nwb3J0IC0gU0lEOiA0MDMzNSJ9.r0IdWmYZAmIpQhXQnOwIDn0n9wNKWoydVKagcK11_Tp554v-9-XlKwHFHoXrReXLWMvYePhF7kCuz7caUCMmBxdt3oJfB5BKJbeDWnjkPZFCj8y7tY2VvmgYvmLNRfLeKvpgLKx4EP5R3GemK0t7AsGHNG_3CuMhCOjGW4g-3N4'
        }
    }
});

db.get('mydoc').then(function (doc) {
    console.log(doc);
}).catch((err) => {
    console.log(err);
})