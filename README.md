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
