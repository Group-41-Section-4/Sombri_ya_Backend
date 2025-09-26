# syntax=docker/dockerfile:1

FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Copy local code to the container image.
COPY . .

# Run the application
CMD npm run start:dev

FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . . 

# Build the application
RUN npm run build

CMD node dist/main
