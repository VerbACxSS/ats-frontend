FROM node:22.14.0-bookworm-slim AS builder

# Move into the build directory
WORKDIR /build

# Copy the node and angular files
COPY angular.json angular.json
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

FROM nginxinc/nginx-unprivileged:1.29.1-alpine3.22 AS deploy

# Move into the release directory
WORKDIR /release

# Copy the build files
COPY --from=builder --chown=nginx:nginx /build/dist/browser /release

# Copy the server config
COPY nginx.conf /etc/nginx/nginx.conf
COPY server.conf /etc/nginx/conf.d/default.conf

# Start NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
