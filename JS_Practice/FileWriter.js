const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { log } = require('console');
const port = 3000;
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.text());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    const filePath = path.join('Readme/About.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
        } else {
            res.send(data);
        }
    });
});

app.post('/execute-vbscript', (req, res) => {
    const script = req.body;
    log("\n ---------------- Script received ----------------- \n" + script)

    if (typeof script !== 'string') {
        res.status(400).send('Script must be a string');
        return;
    }

    // Write script contents to file
    fs.writeFile('example.vbs', script, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
            return;
        }

        // Execute script using cscript
        exec('cscript example.vbs', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                res.status(500).send(err.message);
                return;
            }

            console.log(`\n Output from the script execution : ${stdout}`);
            //console.error(`stderr: ${stderr}`);

            // Return script output as response
            res.send(stdout);
        });
    });
});
