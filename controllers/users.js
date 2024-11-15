const usersModel = require("../db/supabase/users.js");

const getUsersController = async (req, res) => {
	try {
		const users = await usersModel.getAllUsers();
		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.pageSize) || users.length;
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedUsers = users.slice(startIndex, endIndex);

		res.set({
			"X-Total-Count": users.length,
			"X-Page": page,
			"X-Page-Size": pageSize,
		});

		res.json(paginatedUsers);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error reading user data", error: error.message });
	}
};

const getSingleUserController = async (req, res) => {
	try {
		const user = await usersModel.getUserById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error reading user data", error: error.message });
	}
};

const createUserController = async (req, res) => {
	try {
		const newUser = await usersModel.createUser(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating user", error: error.message });
	}
};

const updateUserController = async (req, res) => {
	try {
		const updatedUser = await usersModel.updateUser(req.params.id, req.body);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(updatedUser);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating user", error: error.message });
	}
};

const deleteUserController = async (req, res) => {
	try {
		const deleted = await usersModel.deleteUser(req.params.id);
		if (!deleted) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(204).send();
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error deleting user", error: error.message });
	}
};

module.exports = {
	getUsersController,
	getSingleUserController,
	createUserController,
	updateUserController,
	deleteUserController,
};
