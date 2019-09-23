const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const {checkSchema} = require('express-validator');


router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

let songs = [
    {
        id: 1,
        title: "Goodbyes",
        artists: ["Post Malone"],
        album: "Goodbyes",
        image: "https://e-cdns-images.dzcdn.net/images/cover/a34c120da927629e8c174d4ff3a29eed/264x264-000000-80-0-0.jpg"
    },
    {
        id: 2,
        title: "I Feel It Coming",
        artists: ["The Weeknd", "Daft Punk"],
        album: "Starboy",
        image: "https://e-cdns-images.dzcdn.net/images/cover/afa915d88d871b6f929e61ada8aa644f/264x264-000000-80-0-0.jpg"
    },
    {
        id: 3,
        title: "In the End",
        artists: ["Linkin Park"],
        album: "Hybrid Theory",
        image: "https://e-cdns-images.dzcdn.net/images/cover/033a271b5ec10842c287827c39244fb5/264x264-000000-80-0-0.jpg"
    },
    {
        id: 4,
        title: "rockstar",
        artists: ["Post Malone", "21 Savage"],
        album: "beerbongs & bentleys",
        image: "https://e-cdns-images.dzcdn.net/images/cover/c000a4d39f31f3716bf3f11aa5fab080/264x264-000000-80-0-0.jpg"

    }
];

function remove (array, id){
    return array.filter(song => song.id!==id);
}

router.all('*', function (req, res, next) {
    console.log('song requested');
    next();
})

router.get('/songs', function (req, res) {
    res.send(songs);
});

router.get('/songs/:songId', function (req, res) {
    let data = songs.find(song =>
        song.id === parseInt(req.params.songId)
    );
    res.status(200).send(data);
});

router.post('/songs',

    /*checkSchema({
    title: {
        in: ["body"],
        isString: true,
        rtrim: {
            options:[[" "]]
        }
    }


})
,*/function (req, res) {

        let song = req.body;
        newId = songs.length + 1;
        song.id = newId;

        songs.push(song);
        console.log(song);
        res.status(201).send(song);
    });

router.put('/songs/:songId', function (req, res, next) {
    const songId = parseInt(req.params.songId);
    for (let i in songs){
        if (songs[i].id === songId){
            songs[i] = req.body;
            songs[i].id = parseInt(songs[i].id );
        }
    }
    res.status(200).send();
});

router.delete('/songs/:songId', function (req, res) {
    songs = remove(songs,parseInt(req.params.songId));
    res.status(200).send();
});
module.exports = router;
