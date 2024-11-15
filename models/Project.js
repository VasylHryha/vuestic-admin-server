class Project {
	constructor({ project_name, project_owner, team, status }) {
		this.project_name = project_name;
		this.project_owner = project_owner;
		this.team = team;
		this.status = status;
	}
}

module.exports = Project;
