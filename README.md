# Cat Adoption Application

Welcome to the Cat Adoption Application! This full-stack application is built with NestJS for the backend and Vite React for the frontend.

## Installation

To get started with the development environment, follow these steps:

### 1. Clone this repository to your local machine:

```
git clone https://github.com/iamsrikanthnani/cat-adoption.git
```

### 2. Install dependencies for both the backend and frontend:

```
npm install
```

### 3. Set up environment variables for **backend**, do `cd backend` and then:

- Copy the `.env.example` file and rename it to `.env`.

```
cp .env.example .env
```

- Open the `.env` file in a text editor and fill in the following variables:

  ```
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_USER=
  POSTGRES_PASSWORD=
  POSTGRES_DB=
  JWT_SECRET_KEY=
  ```

Make sure to replace the values with appropriate ones based on your PostgreSQL configuration and desired JWT secret key.

### 4. Start the development servers for both the backend and frontend:

```
npm run start
```

This will start both the backend server (NestJS) and frontend server (Vite React) concurrently.

## Development Scripts

- `npm run backend`: Starts the backend server in development mode.
- `npm run frontend`: Starts the frontend server in development mode.
- `npm start`: Starts both the backend and frontend servers concurrently.
- `npm run install`: Installs dependencies for both backend and frontend.
- `npm run clean`: Cleans up dependencies and lock files for both backend and frontend.

## Backend Endpoints

### Authentication

- `POST /auth/register:` Register a new user and return a JWT.
- `POST /auth/login:` Authenticate a user and return a JWT.

### Cat Management

- `GET /cats:` Retrieve a list of all cats.
- `POST /cats:` Create a new cat profile (admin only).
- `GET /cats/{id}:` Retrieve a cat profile by ID.
- `PUT /cats/{id}:` Update a cat profile by ID (admin only).
- `DELETE /cats/{id}:` Delete a cat profile by ID (admin only).

## Backend Additional Feature
Associating Users with Created Cats
- When an admin creates a new cat using the create endpoint (`POST /cats`), the user who made the request is automatically associated with the created cat.
- This association is achieved by setting the `user` field in the `createCatDto` to the user object extracted from the JWT token.
- This allows for tracking the creator of each cat within the system.


## Backend Test Results
All test suites passed successfully.
- **Test Suites:** 6 passed, 6 total
- **Tests:** 30 passed, 30 total
- **Snapshots:** 0 total
- **Time:** 4.009 s
