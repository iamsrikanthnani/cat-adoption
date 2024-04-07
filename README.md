# Cat Adoption Application

Welcome to the Cat Adoption Application! This full-stack application is built with NestJS for the backend and Vite React for the frontend.

## Installation :sparkles:

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
  POSTGRES_USER=[Your PostgreSQL Username]
  POSTGRES_PASSWORD=[Your PostgreSQL Password]
  POSTGRES_DB=[Your PostgreSQL Database Name]
  JWT_SECRET_KEY=[Your JWT Secret Key]
  ```

Make sure to replace the values with appropriate ones based on your PostgreSQL configuration and desired JWT secret key.

### 4. Start the development servers for both the backend and frontend:

```
npm run start
```

This will start both the backend server (NestJS) and frontend server (Vite React) concurrently.

## Development Scripts :sparkles:

- `npm run backend`: Starts the backend server in development mode.
- `npm run frontend`: Starts the frontend server in development mode.
- `npm start`: Starts both the backend and frontend servers concurrently.
- `npm run install`: Installs dependencies for both backend and frontend.
- `npm run clean`: Cleans up dependencies and lock files for both backend and frontend.

## Backend Endpoints :sparkles:

### Authentication  🌐 

- `POST /auth/register:` Register a new user and return a JWT.
- `POST /auth/login:` Authenticate a user and return a JWT.

### Cat Management  🌐 

- `GET /cats:` Retrieve a list of all cats.
- `POST /cats:` Create a new cat profile (admin only).
- `GET /cats/{id}:` Retrieve a cat profile by ID.
- `PUT /cats/{id}:` Update a cat profile by ID (admin only).
- `DELETE /cats/{id}:` Delete a cat profile by ID (admin only).
- `POST /favorites/add`: Add a cat to favorites.
- `DELETE /favorites/remove`: Remove a cat from favorites.
- `GET /favorites`: Retrieve all favorite cats of the authenticated user.

## Entity Relations :sparkles:

In this project, I have established several entity relations to organize and manage data effectively. Below are the details of the entity relations:

### 👤 User to 🐱 Cat Relation
- **Description:** Enables each user to have multiple cats associated with them.
- **Purpose:** Facilitates better organization and management of cat data per user.
- **Implementation:** This relation is established through a one-to-many association, where each user can have multiple cats.


### 👤 User to ⭐ Favorite Relation
- **Description:** Enables each user to have multiple favorites associated with them.
- **Purpose:** Allows users to save and manage their favorite cats effectively.
- **Implementation:** This relation is established through a one-to-many association, where each user can have multiple favorites.

These entity relations play a crucial role in structuring the data and enhancing the functionality of the application.


## Backend Test Results :sparkles:

The following test suites have been meticulously executed and all tests have passed successfully:

- (PASS :white_check_mark:) `src/auth/auth.service.spec.ts`
- (PASS :white_check_mark:) `src/auth/auth.controller.spec.ts`
- (PASS :white_check_mark:) `src/users/users.service.spec.ts`
- (PASS :white_check_mark:) `src/users/users.controller.spec.ts`
- (PASS :white_check_mark:) `src/cats/cats.service.spec.ts`
- (PASS :white_check_mark:) `src/cats/cats.controller.spec.ts`
- (PASS :white_check_mark:) `src/favorites/favorites.service.spec.ts`
- (PASS :white_check_mark:) `src/favorites/favorites.controller.spec.ts`

All test suites passed successfully.

- **Test Suites:** 8 passed, 8 total :white_check_mark:
- **Tests:** 52 passed, 52 total :white_check_mark:
- **Snapshots:** 0 total :white_check_mark:
- **Time:** 4.773s :white_check_mark:
