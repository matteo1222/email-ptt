
/*
const express = require('express');
const {spawn} = require('child_process');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    let dataToSend;

    const python = spawn('python', ['./script1.py']);

    python.stdout.on('data', function(data){
        console.log('Pipe data from python script...');
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend);
    });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
*/

const express = require('express')
const app = express()
let { PythonShell } = require('python-shell')

app.listen(3000, () => {
  console.log('server running on port 3000')
})

app.get('/call/python', pythonProcess)

function pythonProcess(req, res) {
  let options = {
    args:
      [
        req.query.name,
        req.query.from
      ]
  }

  PythonShell.run('./script1.py', options, (err, data) => {
    if (err) res.send(err)
    const parsedString = JSON.parse(data)
    console.log(`name: ${parsedString.Name}, from: ${parsedString.From}`)
    res.json(parsedString)
  })

}