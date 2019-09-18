const express = require('express');
const bodyParser =  require('body-parser');
const router = express.Router();
const cors = require('cors');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());
router.use(cors());

router.get('/songs', function (req, res) {
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
    res.status(200).send(songs);
});


module.exports = router;
