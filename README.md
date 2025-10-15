# Roommate Matching Backend

A microservices-based backend system for roommate matching built with NestJS, featuring multiple specialized services communicating via gRPC and message queues.

## 🏗️ Project Overview

This project is designed to help people find compatible roommates through an intelligent matching system. The backend is built using a microservices architecture, where each service handles a specific domain of the application.

### Architecture

The system consists of the following microservices:

- **API Gateway** (Port 3000) - Main HTTP entry point and request routing
- **Auth Service** - Authentication microservice (RabbitMQ)
- **Profiles Service** - User profile management (gRPC)
- **Rooms Service** - Room listings and property management (RabbitMQ)
- **Roommate Matching Service** - Intelligent matching algorithms (RabbitMQ)
- **Reviews Service** - User reviews and ratings system (RabbitMQ)
- **Notifications Service** - Real-time notifications and messaging (RabbitMQ)

**Communication Architecture:**
- **API Gateway** serves as the single HTTP entry point on port 3000
- **Profiles Service** uses gRPC for synchronous communication
- **All other microservices** communicate via RabbitMQ message queues
- **No direct HTTP access** to individual microservices (true microservice architecture)

### Technology Stack

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL (primary), MongoDB (notifications)
- **Message Queue**: RabbitMQ
- **Communication**: 
  - gRPC for Profiles service (synchronous)
  - RabbitMQ for all other services (asynchronous messaging)
- **ORM**: Prisma
- **Authentication**: JWT with Passport
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Docker** and **Docker Compose** - [Download here](https://docs.docker.com/get-docker/)
- **Git** - Version control

## 🚀 Quick Start Guide

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd roommate-matching-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Infrastructure Services

Start the required databases and message queue using Docker:

```bash
# Start all infrastructure services (PostgreSQL, MongoDB, RabbitMQ)
docker-compose up -d

# Verify all services are running
docker-compose ps
```

You should see:
- ✅ PostgreSQL running on port 5432
- ✅ MongoDB running on port 27017
- ✅ RabbitMQ running on ports 5672 (AMQP) and 15672 (Management UI)

### Step 4: Environment Configuration

Create environment files for each service. You can either copy from the provided development templates or create them manually:

**Option A: Copy from Development Templates (Recommended)**
```bash
# Copy .env.dev files to .env for all services
cp apps/auth/.env.dev apps/auth/.env
cp apps/profiles/.env.dev apps/profiles/.env
cp apps/rooms/.env.dev apps/rooms/.env
cp apps/notifications/.env.dev apps/notifications/.env
cp apps/reviews/.env.dev apps/reviews/.env
cp apps/roommate-matching/.env.dev apps/roommate-matching/.env
cp apps/api-gateway/.env.dev apps/api-gateway/.env
```

**Option B: Create Empty Files Manually**
```bash
# Create .env files for all services
touch apps/auth/.env
touch apps/profiles/.env
touch apps/rooms/.env
touch apps/notifications/.env
touch apps/reviews/.env
touch apps/roommate-matching/.env
touch apps/api-gateway/.env
```

> **Note**: After copying from .env.dev files, review and update any values specific to your local environment or security requirements.

### Step 5: Database Setup

Generate Prisma clients and run migrations:

```bash
# Setup all databases at once
npm run prisma:profiles:generate && npm run prisma:profiles:migrate
npm run prisma:rooms:generate && npm run prisma:rooms:migrate
npm run prisma:reviews:generate && npm run prisma:reviews:migrate
npm run prisma:roommate-matching:generate && npm run prisma:roommate-matching:migrate
npm run prisma:notifications:generate && npm run prisma:notifications:push
```

## 🏃‍♂️ Running the Application

### Option 1: Start All Services (Recommended for Full Development)

Open 7 terminal windows/tabs and run each service:

```bash
# Terminal 1 - API Gateway (Start this first)
npm run start:api-gateway

# Terminal 2 - Auth Service
npm run start:auth

# Terminal 3 - Profiles Service
npm run start:profiles

# Terminal 4 - Rooms Service
npm run start:rooms

# Terminal 5 - Roommate Matching Service
npm run start:roommate-matching

# Terminal 6 - Reviews Service
npm run start:reviews

# Terminal 7 - Notifications Service
npm run start:notifications
```

### Option 2: Start Services Individually

For focused development, start only what you need:

```bash
# Always start API Gateway first
npm run start:api-gateway

# Then start specific services based on what you're working on
npm run start:profiles    # For user profile features
npm run start:auth       # For authentication features
npm run start:rooms      # For room management features
# etc.
```

## 🔍 Verification & Testing

### Check Service Health

Once all services are running, verify the system is working:

**Primary Access Point:**
- **API Gateway**: http://localhost:3000 (Main HTTP entry point)

**Infrastructure Services:**
- **RabbitMQ Management UI**: http://localhost:15672 (admin/admin123)
- **PostgreSQL**: localhost:5432 (user/password)
- **MongoDB**: localhost:27017 (user/password)

**Microservice Status:**
The individual microservices don't expose HTTP ports directly. They communicate internally via:
- **gRPC service** (profiles only)
- **RabbitMQ queues** (auth, rooms, roommate-matching, reviews, notifications)

To verify microservices are running, check:
```bash
# Check if API Gateway is listening on port 3000
npm run start:api-gateway  # Should show "Application is running on: http://[::1]:3000"

# Check RabbitMQ queues to see if services are connected
# Visit http://localhost:15672 and look for active queues

# Check application logs for each service startup
```

### API Testing

Test the complete system through the API Gateway:
- **Postman** - Import the API collection (if available)
- **curl** - Command line testing via API Gateway

Example API calls:
```bash
# Test API Gateway health
curl http://localhost:3000/health

# Test authentication endpoints
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

## 🛠️ Development Commands

### Database Management

```bash
# Generate Prisma clients
npm run prisma:profiles:generate
npm run prisma:rooms:generate
npm run prisma:reviews:generate
npm run prisma:roommate-matching:generate
npm run prisma:notifications:generate

# Run database migrations
npm run prisma:profiles:migrate
npm run prisma:rooms:migrate
npm run prisma:reviews:migrate
npm run prisma:roommate-matching:migrate

# Push schema changes (MongoDB)
npm run prisma:notifications:push
```

## 🔧 Troubleshooting

### Common Issues and Solutions

**1. Port Already in Use Error**
```bash
# Check what's using the port
lsof -i :3000

# Kill the process using the port
kill -9 <PID>
```

**2. Docker Services Won't Start**
```bash
# Stop all services
docker-compose down

# Remove volumes and restart (⚠️ This will delete data)
docker-compose down -v
docker-compose up -d

# Check service logs
docker-compose logs -f
```

**3. Database Connection Issues**
- Ensure Docker services are running: `docker-compose ps`
- Verify database credentials in `.env` files
- Check if Prisma schema matches your database
- Ensure migrations are up to date

**4. Service Communication Problems**
- Verify all required services are running
- Check gRPC service configurations
- Ensure RabbitMQ is accessible: http://localhost:15672
- Check network connectivity between services

**5. Prisma/Database Issues**
```bash
# Reset database (⚠️ This will delete all data)
npm run prisma:profiles:migrate reset

# Regenerate Prisma client
npm run prisma:profiles:generate

# Check database connection
npm run prisma:profiles:studio
```

### Debugging Tips

```bash
# View Docker container logs
docker-compose logs -f postgres
docker-compose logs -f mongodb
docker-compose logs -f rabbitmq

# Debug individual services
npm run start:profiles:debug
npm run start:auth:debug

# Check service status
curl http://localhost:3000/health
```

## 🌐 API Documentation

### Main Endpoints

Once the API Gateway is running, all API requests go through:

- **Base URL**: http://localhost:3000
- **Authentication**: `/auth/login`, `/auth/register`
- **User Profiles**: `/profiles`
- **Room Listings**: `/rooms`
- **Roommate Matching**: `/roommate-matching`
- **Reviews**: `/reviews`
- **Notifications**: `/notifications`

### Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

## 📦 Project Structure

```
roommate-matching-backend/
├── apps/                          # Microservices
│   ├── api-gateway/              # Main API gateway
│   ├── auth/                     # Authentication service
│   ├── profiles/                 # User profiles service
│   ├── rooms/                    # Room management service
│   ├── roommate-matching/        # Matching algorithms
│   ├── reviews/                  # Reviews and ratings
│   └── notifications/            # Notification service
├── libs/                         # Shared libraries
│   ├── common/                   # Common utilities
│   └── photos/                   # Photo handling
├── docker/                       # Docker configurations
├── docker-compose.yml            # Infrastructure setup
└── package.json                  # Dependencies and scripts
```
