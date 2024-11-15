const express = require("express");
const router = express.Router();
const {
	getUsersController,
	getSingleUserController,
	createUserController,
	updateUserController,
	deleteUserController,
} = require("../controllers/users.js");

/**
 * @route GET /users
 * @description Get a list of users with pagination
 * @query {number} page - Page number (default: 1)
 * @query {number} pageSize - Number of items per page (default: null)
 * @returns {Array} Array of user objects
 *
 * @example
 * // Request
 * GET /users?page=2&pageSize=5
 *
 * // Response
 * [
 *   {
 * 	   "id": "339cbaac-2731-47a6-b0bb-e68be14addb9",
 * 	   "email": "magicpan@example.gg",
 * 	   "fullname": "Patrik Radkow",
 * 	   "username": "magicpan",
 * 	   "role": "user",
 * 	   "projects": [
 * 		   "1e7b566f-27c3-41c9-9a42-a10e3231671c"
 * 	   ],
 * 	   "active": true,
 * 	   "avatar": "https://ui-avatars.com/api/?name=PR&background=4e73df&color=fff",
 * 	   "notes": null,
 * 	   "created_at": "2016-08-17",
 * 	   "updated_at": null
 *   }
 *   // ...
 * ]
 */
router.get("/", getUsersController);

/**
 * @route GET /users/:id
 * @description Get a single user by ID
 * @param {string} id - User ID
 * @returns {Object} User object if found, otherwise 404
 *
 * @example
 * // Request
 * GET /users/339cbaac-2731-47a6-b0bb-e68be14addb9
 *
 * // Response (success)
 *  {
 * 	   "id": "339cbaac-2731-47a6-b0bb-e68be14addb9",
 * 	   "email": "magicpan@example.gg",
 * 	   "fullname": "Patrik Radkow",
 * 	   "username": "magicpan",
 * 	   "role": "user",
 * 	   "projects": [
 * 		   "1e7b566f-27c3-41c9-9a42-a10e3231671c"
 * 	   ],
 * 	   "active": true,
 * 	   "avatar": "https://ui-avatars.com/api/?name=PR&background=4e73df&color=fff",
 * 	   "notes": null,
 * 	   "created_at": "2016-08-17",
 * 	   "updated_at": null
 *  }
 *
 * // Response (not found)
 * {
 *   "message": "User not found"
 * }
 */
router.get("/:id", getSingleUserController);

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
 *   "fullname": "Jane Smith",
 *   "email": "jane@example.com",
 *   "username": "janesmith",
 *   "role": "admin",
 *   "projects": [],
 *   "active": true
 * }
 *
 * // Response
 * {
 * 	 "id": "339cbaac-2731-47a6-b0bb-e68be14addb9",
 * 	 "email": "jane@example.com",
 * 	 "fullname": "Jane Smith",
 * 	 "username": "janesmith",
 * 	 "role": "user",
 * 	 "projects": [
 * 		 "1e7b566f-27c3-41c9-9a42-a10e3231671c"
 * 	 ],
 * 	 "active": true,
 * 	 "avatar": "https://ui-avatars.com/api/?name=PR&background=4e73df&color=fff",
 * 	 "notes": null,
 * 	 "created_at": "2016-08-17",
 * 	 "updated_at": null
 *  }
 */
router.post("/", createUserController);

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
 *   "fullname": "Jane Doe",
 *   "active": false
 * }
 *
 * // Response (success)
 * {
 *   "id": "7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8",
 *   "fullname": "Jane Doe",
 *   "email": "jane@example.com",
 *   "username": "janesmith",
 *   "role": "ADMIN",
 *   "projects": [],
 *   "active": false
 * }
 *
 * // Response (not found)
 * {
 *   "message": "User not found"
 * }
 */
router.put("/:id", updateUserController);

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
router.delete("/:id", deleteUserController);

module.exports = router;
