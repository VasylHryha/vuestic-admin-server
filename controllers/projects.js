const projectsModel = require("../db/supabase/projects.js");

const getProjectsController = async (req, res) => {
	try {
		const projects = await projectsModel.getAllProjects();
		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.pageSize) || projects.length;
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedProjects = projects.slice(startIndex, endIndex);

		res.set({
			"X-Total-Count": projects.length,
			"X-Page": page,
			"X-Page-Size": pageSize,
		});

		res.json(paginatedProjects);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error reading projects data", error: error.message });
	}
};

const getSingleProjectController = async (req, res) => {
	try {
		const project = await projectsModel.getProjectById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}
		res.json(project);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error reading user data", error: error.message });
	}
};

const createProjectController = async (req, res) => {
	try {
		const newProject = await projectsModel.createProject(req.body);
		res.status(201).json(newProject);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating project", error: error.message });
	}
};

const updateProjectController = async (req, res) => {
	try {
		const updatedProject = await projectsModel.updateProject(
			req.params.id,
			req.body,
		);
		if (!updatedProject) {
			return res.status(404).json({ message: "Project not found" });
		}
		res.json(updatedProject);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating project", error: error.message });
	}
};

const deleteProjectController = async (req, res) => {
	try {
		const deleted = await projectsModel.deleteProject(req.params.id);
		if (!deleted) {
			return res.status(404).json({ message: "Project not found" });
		}
		res.status(204).send();
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error deleting project", error: error.message });
	}
};

module.exports = {
	getProjectsController,
	getSingleProjectController,
	createProjectController,
	updateProjectController,
	deleteProjectController,
};
