import {Song} from "./song/SongService";
import sqlite, {Database} from "sqlite";

export const initializeDatabase = () => {
	const songs: Song[] = [
		{
			id: 1,
			title: "Goodbyes",
			artists: ["Post Malone"],
			album: "Goodbyes",
			image: "https://e-cdns-images.dzcdn.net/images/cover/a34c120da927629e8c174d4ff3a29eed/264x264-000000-80-0-0.jpg",
			rating: 4
		},
		{
			id: 2,
			title: "I Feel It Coming",
			artists: ["The Weeknd", "Daft Punk"],
			album: "Starboy",
			image: "https://e-cdns-images.dzcdn.net/images/cover/afa915d88d871b6f929e61ada8aa644f/264x264-000000-80-0-0.jpg",
			rating: 4
		},
		{
			id: 3,
			title: "In the End",
			artists: ["Linkin Park"],
			album: "Hybrid Theory",
			image: "https://e-cdns-images.dzcdn.net/images/cover/033a271b5ec10842c287827c39244fb5/264x264-000000-80-0-0.jpg",
			rating: 5
		},
		{
			id: 4,
			title: "rockstar",
			artists: ["Post Malone", "21 Savage"],
			album: "beerbongs & bentleys",
			image: "https://e-cdns-images.dzcdn.net/images/cover/c000a4d39f31f3716bf3f11aa5fab080/264x264-000000-80-0-0.jpg",
			rating: 3
		}
	];

	console.log("Initializing database...");
	// @ts-ignore
	const dbPromise = sqlite.open("./songs.sqlite", {Promise});
	dbPromise.then((db: Database) => {
		db.run(`
            CREATE TABLE IF NOT EXISTS songs
            (
                id      INTEGER PRIMARY KEY,
                title   TEXT    NOT NULL,
                artists TEXT    NOT NULL,
                album   TEXT    NOT NULL,
                image   TEXT    NOT NULL,
                rating  INTEGER NOT NULL
            );
		`);
	});
	dbPromise.then((db: Database) => {
		db.get("SELECT * FROM songs;").then((result) => {
			if (result === undefined) {
				const statement = db.prepare(`
                    INSERT INTO songs
                    (title,
                     artists,
                     album,
                     image,
                     rating)
                    VALUES (?, ?, ?, ?, ?);
				`);
				songs.forEach((song: Song) => statement.then(result => result.run(song.title, song.artists.join(","), song.album, song.image, song.rating)));
			}
		});
	});
};
