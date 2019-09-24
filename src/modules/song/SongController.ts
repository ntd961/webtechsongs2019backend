import express from "express";
import {Song} from "./SongService";
import {authenticationService, songService} from "../../app";

const router = express.Router();

router.get("/songs", async (req, res) => {
	const {searchValue, rating} = req.query;
	res.send(await songService.getSongs(searchValue, parseInt(rating) || null));
});

router.all("/songs*", (req, res, next) => {
	const {accessToken} = req.cookies;
	if (authenticationService.getUser(accessToken) !== null) {
		next();
		return;
	}
	res.status(401).send();
});

router.get("/songs/:songId", async (req, res) => {
	const songId = parseInt(req.params.songId);
	res.status(200).send(await songService.getSong(songId));
});

router.post("/songs", async (req, res) => {
	const {title, artists, album, image, rating} = req.body as Song;
	res.status(201).send(await songService.createSong(title, artists, album, image, rating));
});

router.put("/songs/:songId", async (req, res) => {
	const songId = parseInt(req.params.songId);
	const {title, artists, album, image, rating} = req.body as Song;
	res.status(200).send(await songService.editSong(songId, title, artists, album, image, rating));
});

router.delete("/songs/:songId", async (req, res) => {
	const songId = parseInt(req.params.songId);
	await songService.deleteSong(songId);
	res.status(204).send();
});

export const songControllerRouter = router;
