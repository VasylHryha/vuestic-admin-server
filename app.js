const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(bodyParser.json());

const DB_DIR = path.join(__dirname, 'db');
const DATA_FILE = path.join(DB_DIR, 'users.json');

// Helper functions for file operations
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

// Routes

/**
 * @route GET /users
 * @description Get a list of users with pagination
 * @query {number} page - Page number (default: 1)
 * @query {number} pageSize - Number of items per page (default: 10)
 * @returns {Array} Array of user objects
 *
 * @example
 * // Request
 * GET /users?page=2&pageSize=5
 *
 * // Response
 * [
 *   {
 *     "id": "550e8400-e29b-41d4-a716-446655440000",
 *     "fullName": "John Doe",
 *     "email": "john@example.com",
 *     "username": "johndoe",
 *     "role": "USER",
 *     "projects": ["project1", "project2"],
 *     "isActive": true
 *   },
 *   // ... (4 more user objects)
 * ]
 */
app.get('/users', async (req, res) => {
  try {
    const users = await readUsersFromFile();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = users.slice(startIndex, endIndex);

    // Добавляем заголовки для пагинации
    res.set({
      'X-Total-Count': users.length,
      'X-Page': page,
      'X-Page-Size': pageSize
    });

    res.json(paginatedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error reading users data', error: error.message });
  }
});

/**
 * @route GET /users/:id
 * @description Get a single user by ID
 * @param {string} id - User ID
 * @returns {Object} User object if found, otherwise 404
 *
 * @example
 * // Request
 * GET /users/550e8400-e29b-41d4-a716-446655440000
 *
 * // Response (success)
 * {
 *   "id": "550e8400-e29b-41d4-a716-446655440000",
 *   "fullName": "John Doe",
 *   "email": "john@example.com",
 *   "username": "johndoe",
 *   "role": "USER",
 *   "projects": ["project1", "project2"],
 *   "isActive": true
 * }
 *
 * // Response (not found)
 * {
 *   "message": "User not found"
 * }
 */
app.get('/users/:id', async (req, res) => {
  try {
    const users = await readUsersFromFile();
    const user = users.find(user => user.id === req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error reading user data', error: error.message });
  }
});

/**
 * @route POST /users
 * @description Create a new user
 * @body {Object} user - User object without ID
 * @returns {Object} Created user object with generated ID
 *
 * @example
 * // Request
 * POST /users
 * Content-Type: application/json
 *
 * {
 *   "fullName": "Jane Smith",
 *   "email": "jane@example.com",
 *   "username": "janesmith",
 *   "role": "ADMIN",
 *   "projects": [],
 *   "isActive": true
 * }
 *
 * // Response
 * {
 *   "id": "7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8",
 *   "fullName": "Jane Smith",
 *   "email": "jane@example.com",
 *   "username": "janesmith",
 *   "role": "ADMIN",
 *   "projects": [],
 *   "isActive": true
 * }
 */
app.post('/users', async (req, res) => {
  try {
    const users = await readUsersFromFile();
    const newUser = { ...req.body, id: uuidv4() };
    users.push(newUser);
    await writeUsersToFile(users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

/**
 * @route PUT /users/:id
 * @description Update an existing user
 * @param {string} id - User ID
 * @body {Object} user - Partial user object with fields to update
 * @returns {Object} Updated user object
 *
 * @example
 * // Request
 * PUT /users/7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8
 * Content-Type: application/json
 *
 * {
 *   "fullName": "Jane Doe",
 *   "isActive": false
 * }
 *
 * // Response (success)
 * {
 *   "id": "7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8",
 *   "fullName": "Jane Doe",
 *   "email": "jane@example.com",
 *   "username": "janesmith",
 *   "role": "ADMIN",
 *   "projects": [],
 *   "isActive": false
 * }
 *
 * // Response (not found)
 * {
 *   "message": "User not found"
 * }
 */
app.put('/users/:id', async (req, res) => {
  try {
    const users = await readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    users[userIndex] = { ...users[userIndex], ...req.body };
    await writeUsersToFile(users);
    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

/**
 * @route DELETE /users/:id
 * @description Delete a user
 * @param {string} id - User ID
 * @returns {null} No content
 *
 * @example
 * // Request
 * DELETE /users/7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8
 *
 * // Response (success)
 * Status: 204 No Content
 *
 * // Response (not found)
 * {
 *   "message": "User not found"
 * }
 */
app.delete('/users/:id', async (req, res) => {
  try {
    const users = await readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    await writeUsersToFile(users);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});


// Root route with docs
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>REST API Demo Project</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1 { color: #333; }
            h2 { color: #666; }
            ul { list-style-type: none; padding-left: 0; }
            li { margin-bottom: 10px; }
            a { color: #0066cc; text-decoration: none; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <h1>REST API Demo Project</h1>
        <p>API for Vuestic <a href="https://admin-demo.vuestic.dev/users" target="_blank">users list</a></p>

        <h2>Request Examples:</h2>

        <ul>
            <li><strong>GET /users:</strong> <a href="/users?page=2&pageSize=5">/users?page=2&pageSize=5</a></li>
            <li><strong>GET /users/:id:</strong> <a href="/users/550e8400-e29b-41d4-a716-446655440000">/users/550e8400-e29b-41d4-a716-446655440000</a></li>
            <li><strong>POST /users:</strong> /users (POST request with JSON body)</li>
            <li><strong>PUT /users/:id:</strong> /users/7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8 (PUT request with JSON body)</li>
            <li><strong>DELETE /users/:id:</strong> /users/7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8 (DELETE request)</li>
        </ul>

        <p>Note: For POST and PUT requests, send appropriate JSON data in the request body.</p>
    </body>
    </html>
  `;

  res.send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
