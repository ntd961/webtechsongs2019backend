import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";

export interface User {
	id: number;
	username: string;
	password: string;
}

export interface TokenDetails {
	userId: number,
	token: string;
	expirationDate: Date;
}

class AuthenticationService {

	private users: User[] = [
		{
			id: 1,
			username: "Ducky",
			password: "$2b$10$6Q/MOLWKY1mVEDUCJJ1KxOGmY1Engb7VoUz2sZQFwKAcn3S1s3AH." // means "password"
		}
	];

	private tokens: TokenDetails[] = [];

	login(username: string, password: string): TokenDetails | null {

		const user = this.users.find(user => user.username.toLocaleLowerCase() === username.toLocaleLowerCase()) || null;
		if (user !== null && bcrypt.compareSync(password, user.password)) {
			const token = {
				userId: user.id,
				token: uuidv4(),
				expirationDate: new Date(Date.now() + 60 * 60 * 1000)
			};
			this.tokens.push(token);
			return token;
		}
		return null;
	}

	logout(token: string) {
		const indexToDelete = this.tokens.findIndex(t => t.token === token);
		this.tokens.splice(indexToDelete, 1);
	}

	getUser(token: string): User | null {
		const now = new Date();

		const userId: number | null = this.tokens
			.filter(t => t.expirationDate > now)
			.filter(t => t.token === token)
			.map(t => t.userId)
			.find(u => u !== undefined && u !== null) || null;

		return this.users.find(user => user.id === userId) || null;
	}
}

export default AuthenticationService;
