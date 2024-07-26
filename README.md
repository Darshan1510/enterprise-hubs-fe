# Enterprise Hubs Frontend

This is the frontend application for the Enterprise Hubs project. The application is built using React and TypeScript, with Cypress for end-to-end testing.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Darshan1510/enterprise-hubs-fe.git
cd enterprise-hubs-fe
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Running Tests

### Run Cypress Tests

1. Ensure the development server is running:

   ```bash
   npm start
   ```

2. Open Cypress and run the tests:

   ```bash
   npx cypress open
   ```

## Docker

### Build and Run with Docker

1. Build the Docker image:

   ```bash
   docker build -t enterprise-hubs-frontend .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 enterprise-hubs-frontend
   ```

The application will be available at `http://localhost:3000`.

## Docker Compose

To run the frontend and backend together using Docker Compose, refer to the Docker Compose setup in the main repository.

### Clone the Repositories

```bash
git clone https://github.com/Darshan1510/enterprise-hubs-fe.git
git clone https://github.com/Darshan1510/enterprise-hubs-be.git
```

### Docker Compose Setup

1. Create a `docker-compose.yml` file in the root directory (outside both repositories):

   ```yaml
   version: '3.8'

   services:
     backend:
       container_name: enterprise-hubs-backend
       build:
         context: ./enterprise-hubs-be
         dockerfile: Dockerfile
       ports:
         - "8000:80"
       environment:
         - PYTHONUNBUFFERED=1

     frontend:
       container_name: enterprise-hubs-frontend
       build:
         context: ./enterprise-hubs-fe
         dockerfile: Dockerfile
       ports:
         - "3000:3000"
       depends_on:
         - backend
   ```

2. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

The frontend will be available at `http://localhost:3000`, and the backend API will be available at `http://localhost:8000`.
