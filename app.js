
const express = require('express');
const fs = require('fs');
const cors = require('cors');

let rawdata = fs.readFileSync('db/db.json');
let data = JSON.parse(rawdata);

const app = express();
app.use(cors());

app.get('/api/v1/cardData/:id', function (req, res) {
    //const id = req.header('cardId');
    console.log(req.params.id);
    console.log(data[req.params.id-1]);
    res.send(data[req.params.id-1]);
});


app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
