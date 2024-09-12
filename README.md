# REST API Demo Project

This project is a demonstration of a REST API for managing a user list, inspired by the [Vuestic users list](https://admin-demo.vuestic.dev/users)

## Project Structure

Based on MVC pattern, the project is organized into the following directories:

```
.
├── routes/
│   ├── index.js
│   ├── root.js
│   └── users.js
├── controllers/
│   ├── root.js
│   └── user.js
├── models/
│   └── user.js
├── db/
│   └── users.json
├── views/
│   └── index.ejs
├── .editorconfig
├── .env
├── .gitignore
├── app.js
├── package.json
├── README.md
└── vercel.json
```

## Project Description

This project implements a RESTful API for managing user data. It provides endpoints for creating, reading, updating, and deleting user information. The application is built using Node.js and Express.js, with data stored in a JSON file.

### Key Components

1. **Controllers**: Handle the logic for processing requests and sending responses.
   - `root.js`: Manages the root route of the application.
   - `user.js`: Contains functions for user-related operations (CRUD).

2. **Models**: Define the data structure and database interactions.
   - `user.js`: Implements functions for reading from and writing to the users JSON file.

3. **Routes**: Define the API endpoints and map them to controller functions.
   - `index.js`: Main router that combines user and root routes.
   - `root.js`: Defines the root route.
   - `users.js`: Defines routes for user-related operations.

4. **Views**: Contains the EJS template for the home page.
   - `index.ejs`: Displays API usage information and examples.

5. **app.js**: The main application file that sets up the Express server and middleware.

6. **vercel.json**: Configuration file for deploying the application on Vercel.

## API Endpoints

- `GET /users`: Retrieve a list of users with pagination support.
- `GET /users/:id`: Retrieve a single user by ID.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update an existing user.
- `DELETE /users/:id`: Delete a user.

More details see in `route/` folder

## Setup and Running

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

   For debugging:
   ```
   npm run dev-debug
   ```

3. The server will start on the port specified in the `PORT` environment variable or default to port 3000.

## Deployment

This project is configured for deployment on Vercel as temporary solution. The `vercel.json` file provides the necessary settings.

## Environment Variables

- `PORT`: The port on which the server will run (default: 3000)

## Dependencies

- express: Web application framework
- dotenv: For loading environment variables
- body-parser: Middleware for parsing request bodies
- uuid: For generating unique identifiers

For a complete list of dependencies, refer to the `package.json` file.
