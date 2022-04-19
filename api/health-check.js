/* eslint-disable @typescript-eslint/no-var-requires */
var http = require('http');

var options = {
  timeout: 2000,
  host: 'localhost',
  port: process.env.PORT || 8080,
  path: '/api/healthCheck', // must be the same as HEALTHCHECK in Dockerfile
};

var request = http.request(options, res => {
  process.exitCode = res.statusCode === 200 ? 0 : 1;
  process.exit();
});

request.on('error', function () {
  process.exit(1);
});

request.end();
