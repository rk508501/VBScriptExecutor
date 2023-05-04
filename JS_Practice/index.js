const { log } = require('console');
var express = require('express');
const { spawn } = require('child_process');
var app = express();

app.use(express.json());

app.get('/', function (request, response) {
  response.send("Welcome to the VBScript Executor");    // echo the result back
});

app.post('/', function (request, response) {
  console.log(request.body);     

  // spawn the VBScript as a child process and pass the input values as command-line arguments
  const scriptProcess = spawn('cscript.exe', [request]);

  // capture the output of the VBScript
  let output = '';
  scriptProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  // handle errors and exit codes
  scriptProcess.on('error', (err) => {
    console.error(`Error running VBScript: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  });

  response.send(request.body);    // echo the result back
});

app.listen(3000, () => {
  log("Listening at port 3000")
});