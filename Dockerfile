# Stage 1: Build
FROM node:18-alpine AS build

# Use a more specific working directory for clarity and organization
WORKDIR /usr/src/app

# Copy only package.json and yarn.lock first to cache dependencies layer
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Expose the app port
EXPOSE 3000

# Build the app (skip the setup if needed)
# RUN yarn build

# Stage 2: Runtime
FROM node:18-alpine

# Working directory for runtime
WORKDIR /usr/src/app

# Copy the built app from the build stage
COPY --from=build /usr/src/app /usr/src/app


# Expose the app port
EXPOSE 3000
CMD sh -c "yarn setup && yarn start server"