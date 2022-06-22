const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT ||3000);

console.log('listening on port ' + process.env.PORT)