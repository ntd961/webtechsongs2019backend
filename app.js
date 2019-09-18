const express = require('express');
const cors = require('cors');
const app = express();

app.use(require('./routes/login'));
app.use(require('./routes/songs'));

var corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200
}
app.use(cors());

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
