# Multi-stage Dockerfile for React 19 Frontend

# Stage 1: Build the production bundle with Node.js
FROM node:22-alpine AS builder
WORKDIR /app

# Cache package manifests
COPY package*.json ./
RUN npm ci || npm install

# Copy source code and perform production build
COPY . .
RUN npm run build

# Stage 2: Serve with lightweight Nginx web server
FROM nginx:1.27-alpine
LABEL maintainer="Enterprise Full Stack Team"

# Copy compiled SPA assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy internal Nginx configuration with React router try_files support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Health check using IPv4 loopback
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD wget -q -O - http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
