const express = require('express');
const router = express.Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require('../controllers/user.js');

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
 *   // ... 
 * ]
 */
router.get('/', getUsers);

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
router.get('/:id', getSingleUser);

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
router.post('/', createUser);

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
router.put('/:id', updateUser);

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
router.delete('/:id', deleteUser);

module.exports = router;
