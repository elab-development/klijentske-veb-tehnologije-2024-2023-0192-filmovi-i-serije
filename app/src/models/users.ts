export interface IUser { id: string; name: string; surname: string; email: string; }
export class User implements IUser {
	id: string;
	name: string;
	surname: string;
	email: string;

	constructor(
		id: string,
		name: string,
		surname: string,
		email: string
	) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.email = email;
	}

	fullName() {
		return `${this.name} ${this.surname}`;
	}
}
