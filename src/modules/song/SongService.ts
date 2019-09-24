import sqlite from "sqlite";

export interface Song {
	id: number;
	title: string;
	artists: string[];
	album: string;
	image: string;
	rating: number;
}

// @ts-ignore
const dbPromise = sqlite.open("./songs.sqlite", {Promise});

class SongService {

	async createSong(title: string, artists: string[], album: string, image: string, rating: number): Promise<Song | null> {

		const db = await dbPromise;
		const preparedStatement = await db.prepare(`INSERT INTO songs (title, artists, album, image, rating)
                                                    VALUES (?, ?, ?, ?, ?)`);
		const response = await preparedStatement.run(title, artists.join(","), album, image, rating);
		return this.getSong(response.lastID);
	}

	async editSong(id: number, title: string, artists: string[], album: string, image: string, rating: number): Promise<Song | null> {

		const db = await dbPromise;
		const preparedStatement = await db.prepare(`UPDATE songs
                                                    set title=?,
                                                        artists=?,
                                                        album=?,
                                                        image=?,
                                                        rating=?
                                                    WHERE id = ?`);
		await preparedStatement.run(title, artists.join(","), album, image, rating, id);
		return this.getSong(id);
	}

	async deleteSong(id: number) {

		const db = await dbPromise;
		const preparedStatement = await db.prepare("DELETE FROM songs WHERE id = ?");
		await preparedStatement.run(id);
	}

	async getSongs(searchValue: string = "", rating: number | null = null): Promise<Song[]> {

		const db = await dbPromise;
		const songs: Song[] = await db.all("SELECT * FROM songs;");
		return songs
			.map((song: any) => {
				song.artists = song.artists.split(",");
				return song;
			})
			.filter((song: Song) => rating === null || song.rating === rating)
			.filter(
				(song: Song) => [...song.artists, song.album, song.title]
					.map(value => value.toLowerCase())
					.some(value => value.indexOf(searchValue.toLowerCase()) !== -1)
			);
	}

	async getSong(id: number): Promise<Song | null> {

		const db = await dbPromise;
		const song = await db.get("SELECT * FROM songs WHERE id = ?;", id);
		song.artists = song.artists.split(",");
		return song;
	}
}

export default SongService;
