const https = require('https');

const options = {
  hostname: 'example.com',
  port: 443,
  path: '/',
  method: 'GET',
  secureProtocol: 'TLSv1.2',
};

const req = https.request(options, (res) => {
  // handle response
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
