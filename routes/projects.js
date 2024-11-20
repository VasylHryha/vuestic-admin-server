const express = require("express");
const router = express.Router();
const {
	getProjectsController,
	getSingleProjectController,
	createProjectController,
	updateProjectController,
	deleteProjectController,
} = require("../controllers/projects.js");

/**
 * @route GET /projects
 * @description Get a list of projects with pagination
 * @query {number} page - Page number (default: 1)
 * @query {number} pageSize - Number of items per page (default: null)
 * @returns {Array} Array of projects objects
 *
 * @example
 * // Request
 * GET /projects?page=2&pageSize=5
 */
router.get("/", getProjectsController);

/**
 * @route GET /projects/:id
 * @description Get a single project by ID
 * @param {string} id - Project ID
 * @returns {Object} Project object if found, otherwise 404
 *
 * @example
 * // Request
 * GET /projects/339cbaac-2731-47a6-b0bb-e68be14addb9
 */
router.get("/:id", getSingleProjectController);

/**
 * @route POST /projects
 * @description Create a new project
 * @body {Object} project - Project object without ID
 * @returns {Object} Created project object with generated ID
 *
 * @example
 * // Request
 * POST /projects
 * Content-Type: application/json
 */
router.post("/", createProjectController);

/**
 * @route PUT /projects/:id
 * @description Update an existing project
 * @param {string} id - Project ID
 * @body {Object} project - project object with updated fields
 * @returns {Object} Project user object
 *
 * @example
 * // Request
 * PUT /project/7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8
 * Content-Type: application/json
 */
router.put("/:id", updateProjectController);

/**
 * @route DELETE /projects/:id
 * @description Delete a project
 * @param {string} id - Project ID
 * @returns {null} No content
 *
 * @example
 * // Request
 * DELETE /projects/7c0e9a5d-8e1f-4f7b-a53d-36c9f3e7a6b8
 */
router.delete("/:id", deleteProjectController);

module.exports = router;
