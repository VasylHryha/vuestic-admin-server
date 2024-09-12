const userModel = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = users.slice(startIndex, endIndex);

    res.set({
      'X-Total-Count': users.length,
      'X-Page': page,
      'X-Page-Size': pageSize
    });

    res.json(paginatedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при чтении данных пользователей', error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при чтении данных пользователя', error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await userModel.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании пользователя', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении пользователя', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await userModel.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении пользователя', error: error.message });
  }
};

module.exports = { getUsers, getSingleUser, createUser, updateUser, deleteUser };
