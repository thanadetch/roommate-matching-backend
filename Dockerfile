FROM node:24-alpine

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client only for the current service if it has a schema
RUN if [ -f "./apps/${SERVICE_NAME}/prisma/schema.prisma" ]; then \
      npx prisma generate --schema=./apps/${SERVICE_NAME}/prisma/schema.prisma; \
    fi

RUN npm run build ${SERVICE_NAME}

EXPOSE 3000

CMD node dist/apps/${SERVICE_NAME}/main.js
