FROM node:20.11.1-buster-slim AS builder
# FROM node:20.11.0-buster-slim AS builder

# Move into the build directory
WORKDIR /build

# Copy the node and angular files
COPY angular.json angular.json
#COPY postbuild.js postbuild.js
COPY tsconfig*.json ./
COPY package.json ./


# Install the dependencies
RUN npm install

# Copy source files
COPY src src

# Build the app
ARG BUILD_VERSION
RUN if [ "$BUILD_VERSION" = "production" ]; \
    then npm run build-production; \
    elif [ "$BUILD_VERSION" = "local" ]; \
    then npm run build-local; \
    fi


FROM bitnami/nginx:1.27.3 AS deploy

# Move into the release directory
WORKDIR /release

# Copy the build files
COPY --from=builder /build/dist/browser /release

# Copy the server config
COPY nginx.conf /opt/bitnami/nginx/conf/nginx.conf
COPY server.conf /opt/bitnami/nginx/conf/server_blocks/server.conf
