class User {
	constructor({
		fullname,
		email,
		username,
		role,
		projects,
		active,
		avatar,
		notes,
	}) {
		this.fullname = fullname;
		this.email = email;
		this.username = username;
		this.role = role;
		this.projects = projects;
		this.active = active;
		this.avatar = avatar;
		this.notes = notes;
	}
}

module.exports = User;
