const express = require('express');
const bodyParser =  require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/login', (req, res)=> {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    if (username && password){
        let users = [
            {
                id: 1,
                "username": "DarkAtra",
                "password": "password"
            },
            {
                id: 2,
                "username": "OneTouch",
                "password": "12345678"},
            {
                id: 3,
                "username": "1234",
                "password": "haha"}
        ];

        let user = users.find(user=>username===user.username);
        if(user && user.password === password){
            res.status(200).send("success")
        }else {
            res.status(400).send("login failed")
        }

        res.send();
    }else {
        res.status(400).send('Daten nicht korrekt');
    }
});

module.exports = router;