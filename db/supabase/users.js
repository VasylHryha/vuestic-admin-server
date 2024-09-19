const supabase = require('./setup.js');
const User = require('../../models/User.js');


const transformRequest = (user) => {
	const { isActive, fullName, ...rest } = user;
	return {
		...rest,
		fullname: fullName,
		is_active: isActive
	}
};

const transformResponse = (userData) => {
	const { _id, is_active, fullname, ...rest } = userData;
	return {
		...rest,
		fullName: fullname,
		isActive: is_active
	}
};

const TABLE = 'users';

const getAllUsers = async () => {
	const { data, error } = await supabase
		.from(TABLE)
		.select();

	if (!error) return data.map(transformResponse);

	throw error;
};

const getUserById = async (id) => {
	const { data, error } = await supabase
		.from(TABLE)
		.select()
		.eq('id', id)
		.select()

	if (!error) return data.map(transformResponse);

	throw error;
};

const createUser = async (userData) => {
   const user = transformRequest(new User(userData));

	 const { data, error } = await supabase
		.from(TABLE)
		.insert(user)
		.select();

	if (!error) return Object.values(data).map(transformResponse);

	throw error;
};

const updateUser = async (id, userData) => {
	const { data, error } = await supabase
		.from(TABLE)
		.update(transformRequest(userData))
		.eq('id', id)
		.select();

	if (!error) return transformResponse(data);

	throw error;
};

const deleteUser = async (id) => {
	const { error } = await supabase
		.from(TABLE)
		.delete()
		.eq('id', id)

	if (!error) return true;

	throw error;
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
