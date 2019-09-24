import express, {Express} from "express";
import {songControllerRouter} from "./modules/song/SongController";
import {authenticationControllerRouter} from "./modules/authentication/AuthenticationController";
import cors from "cors";
import bodyParser from "body-parser";
import cookiesParser from "cookie-parser";
import {initializeDatabase} from "./modules/databaseSetup";
import SongService from "./modules/song/SongService";
import AuthenticationService from "./modules/authentication/AuthenticationService";

export const songService = new SongService();
export const authenticationService: AuthenticationService = new AuthenticationService();

const app: Express = express();
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true,
	optionsSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use(cookiesParser());
app.use(songControllerRouter);
app.use(authenticationControllerRouter);

initializeDatabase();

app.listen(3001, () => console.log("Example app listening on port 3001!"));
