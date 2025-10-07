<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Roommate Matching Backend

A microservices-based backend system for roommate matching built with NestJS, featuring multiple specialized services communicating via gRPC and message queues.

## Architecture

This project consists of the following microservices:
- **API Gateway** - Main entry point and request routing
- **Auth Service** - Authentication and authorization
- **Profiles Service** - User profile management
- **Rooms Service** - Room listings and management
- **Roommate Matching Service** - Matching algorithm and recommendations
- **Reviews Service** - User reviews and ratings
- **Notifications Service** - Real-time notifications

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose
- PostgreSQL (via Docker)
- MongoDB (via Docker)
- RabbitMQ (via Docker)

## Project Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd roommate-matching-backend

# Install dependencies
npm install
```

### 2. Start Infrastructure Services

```bash
# Start PostgreSQL, MongoDB, and RabbitMQ using Docker Compose
docker-compose up -d

# Verify services are running
docker-compose ps
```

### 3. Environment Configuration

Create `.env` files for each service in their respective directories:

```bash
# Example for profiles service
touch apps/profiles/.env
touch apps/rooms/.env
touch apps/notifications/.env
touch apps/reviews/.env
touch apps/roommate-matching/.env
touch apps/auth/.env
```

Configure your environment variables (database connections, ports, etc.) in each `.env` file.

### 4. Database Setup

Generate Prisma clients and run migrations for services that use databases:

```bash
# Profiles service
npm run prisma:profiles:generate
npm run prisma:profiles:migrate

# Rooms service  
npm run prisma:rooms:generate
npm run prisma:rooms:migrate

# Notifications service
npm run prisma:notifications:generate
npm run prisma:notifications:push

# Reviews service
npm run prisma:reviews:generate
npm run prisma:reviews:migrate

# Roommate matching service
npm run prisma:roommate-matching:generate
npm run prisma:roommate-matching:migrate
```

## Starting the Application

### Development Mode

Start all services in development mode with hot reload:

```bash
# Start API Gateway (main entry point)
npm run start:api-gateway

# In separate terminals, start each microservice:
npm run start:auth
npm run start:profiles
npm run start:rooms
npm run start:roommate-matching
npm run start:reviews
npm run start:notifications
```

### Alternative: Start Individual Services

You can also start services individually as needed:

```bash
# Start specific service
npm run start:profiles
npm run start:rooms
# etc.
```

## Service Ports

Each service runs on a different port:
- API Gateway: 3000 (main entry point)
- Auth Service: 3001
- Profiles Service: 3002
- Rooms Service: 3003
- Roommate Matching Service: 3004
- Reviews Service: 3005
- Notifications Service: 3006

## Infrastructure Services

- **PostgreSQL**: localhost:5432
  - Username: user
  - Password: password
  - Database: roommate_matching

- **MongoDB**: localhost:27017
  - Username: user
  - Password: password

- **RabbitMQ**: localhost:5672
  - Management UI: http://localhost:15672
  - Username: admin
  - Password: admin123

## Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## API Documentation

Once the API Gateway is running, you can access the API at:
- Main API: http://localhost:3000

## Troubleshooting

### Database Connection Issues
1. Ensure Docker services are running: `docker-compose ps`
2. Check database credentials in `.env` files
3. Verify Prisma schema and migrations are up to date

### Service Communication Issues
1. Ensure all required services are running
2. Check gRPC service configurations
3. Verify RabbitMQ is running for message queuing

### Port Conflicts
If you encounter port conflicts, update the port configurations in the respective service files and `.env` files.

## Development

This project uses:
- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **gRPC** - Inter-service communication
- **RabbitMQ** - Message queuing
- **JWT** - Authentication
- **Docker** - Containerization

## License

This project is [MIT licensed](LICENSE).
