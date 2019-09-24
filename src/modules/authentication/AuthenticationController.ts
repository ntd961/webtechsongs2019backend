import express from "express";
import {TokenDetails} from "./AuthenticationService";
import {authenticationService} from "../../app";

const router = express.Router();

router.post("/login", (req, res) => {
	const {username, password}: { username: string, password: string } = req.body;
	if (!username || !password) {
		res.status(400).send("Bad Request");
		return;
	}

	const token: TokenDetails | null = authenticationService.login(username, password);
	if (token === null) {
		res.status(401).send("Unauthorized");
		return;
	}

	res.status(200)
		.cookie("accessToken", token.token, {
			expires: token.expirationDate,
			httpOnly: true,
			domain: "localhost",
			path: "/"
		}).send("OK");
});

router.get("/user", (req, res) => {
	const {accessToken} = req.cookies;
	if (accessToken) {
		const user = authenticationService.getUser(accessToken);
		if (user !== null) {
			res.status(200).send(user.username);
			return;
		}
	}
	res.cookie("accessToken", null, {
		expires: new Date(),
		httpOnly: true,
		domain: "localhost",
		path: "/"
	}).status(401).send();
});

router.post("/logout", (req, res) => {
	authenticationService.logout(req.cookies.accessToken);

	res.status(204)
		.cookie("accessToken", null, {
			expires: new Date(),
			httpOnly: true,
			domain: "localhost",
			path: "/"
		}).send();
});

export const authenticationControllerRouter = router;
