const { v4: uuidv4 } = require('uuid');

/*

const UserSample = {
	"id": "1",
	"fullName": "Patrik Radkow",
	"email": "magicpan@example.gg",
	"username": "magicpan",
	"role": "USER",
	"projects": [
		"Galileo",
		"Website redesign",
		"Mobile app"
	],
	"isActive": true,
	"avatar": "https://ui-avatars.com/api/?name=PR&background=4e73df&color=fff"
}

*/

class User {
	constructor({
		id = uuidv4(),
		fullName,
		email,
		username,
		role = 'USER',
		projects = [],
		isActive = true,
		avatar
	}) {
		this.id = id
		this.fullName = fullName
		this.email = email
		this.username = username
		this.role = role
		this.projects = projects
		this.isActive = isActive
		this.avatar = avatar
	}

	static toResponse(user) {
		const { id, fullName, username } = user;
		return { id, fullName, username };
	}
}

module.exports = User;
