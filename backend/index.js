const express = require('express');

const server = express();
server.use(express.json());

server.use('/', express.static(__dirname + '/public'));
server.use('/', express.urlencoded({ extended: true }));

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});

// run with `node index.js`
