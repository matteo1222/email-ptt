const express = require('express');
const {spawn} = require('child_process');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    let dataToSend;

    const python = spawn('python', ['script1.py']);

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