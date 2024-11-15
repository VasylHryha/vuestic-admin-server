const supabase = require("./setup.js");
const Project = require("../../models/Project.js");

const TABLE = "projects";

const getAllProjects = async () => {
	const { data, error } = await supabase
		.from(TABLE)
		.select()
		.order("created_at", { ascending: false });

	if (!error) return data;

	throw error;
};

const getProjectById = async (id) => {
	const { data, error } = await supabase
		.from(TABLE)
		.select()
		.eq("id", id)
		.select();

	if (!error) return data;

	throw error;
};

const createProject = async (project) => {
	const user = new Project(project);

	const { data, error } = await supabase.from(TABLE).insert(user).select();

	if (!error) return Object.values(data);

	throw error;
};

const updateProject = async (id, project) => {
	const { data, error } = await supabase
		.from(TABLE)
		.update(project)
		.eq("id", id)
		.select();

	if (!error) return data;

	throw error;
};

const deleteProject = async (id) => {
	const { error } = await supabase.from(TABLE).delete().eq("id", id);

	if (!error) return true;

	throw error;
};

module.exports = {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
};
