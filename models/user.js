const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_DIR = path.join(__dirname, '..', 'db');
const DATA_FILE = path.join(DB_DIR, 'users.json');

async function ensureDbDirectory() {
  try {
    await fs.access(DB_DIR);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(DB_DIR);
    } else {
      throw error;
    }
  }
}

async function readUsersFromFile() {
  try {
    await ensureDbDirectory();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeUsersToFile(users) {
  await ensureDbDirectory();
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

const getAllUsers = async () => {
  return await readUsersFromFile();
};

const getUserById = async (id) => {
  const users = await readUsersFromFile();
  return users.find(user => user.id === id);
};

const createUser = async (userData) => {
  const users = await readUsersFromFile();
  const newUser = { ...userData, id: uuidv4() };
  users.push(newUser);
  await writeUsersToFile(users);
  return newUser;
};

const updateUser = async (id, userData) => {
  const users = await readUsersFromFile();
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  users[userIndex] = { ...users[userIndex], ...userData };
  await writeUsersToFile(users);
  return users[userIndex];
};

const deleteUser = async (id) => {
  const users = await readUsersFromFile();
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return false;
  }
  users.splice(userIndex, 1);
  await writeUsersToFile(users);
  return true;
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
