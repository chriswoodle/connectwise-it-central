'use strict';

const compress = require('compression');
const express = require('express');
const path = require('path');
const debug = require('debug')('server');

const app = express();
const port = process.env.PORT || 8080;

console.log('**ready**');

app.disable('etag');
app.use(compress());

app.use('/', express.static(path.join(__dirname, '../', '/client')));

// expose bower components
app.use('/bower_components', express.static(path.join(__dirname, '../', '/bower_components')));

app.get('/status', function (req, res, next) {
    res.status(200).send("I'm up!");
});

app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/../client/index.htm'));
});

app.listen(port, () => {
    debug(`Listening on port ${port}`);
});
