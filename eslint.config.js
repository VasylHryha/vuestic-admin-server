"use strict";

const js = require("@eslint/js");
const prettier = require("eslint-plugin-prettier/recommended");
const globals = require("globals");

module.exports = [
	js.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	{
		rules: {
			"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
		},
	},
	prettier,
];
