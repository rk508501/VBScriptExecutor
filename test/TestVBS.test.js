// test.js
const fs = require('fs');
const path = require('path');
const pactum = require('pactum');
const { spec } = require('pactum');
const { log } = require('console');

const filePath = path.join(__dirname, '..');
const fileContent = fs.readFileSync(filePath + "\\example.vbs");

it('Test VBScript Executor GET', async () => {
    await spec()
        .get('http://localhost:3000')
        .inspect()
        .expectStatus(200);
});

it('Test VBScript Executor POST', async () => {
    log(fileContent.toString())

    await spec()
        .post('http://localhost:3000/execute-vbscript')
        .withRequestTimeout(10000)
        .withHeaders({
            'Content-Type': 'text/plain'
        })
        .withBody(fileContent.toString())
        .expectStatus(200);
});
