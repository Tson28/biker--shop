# ===== BIKERHUB BACKEND DOCKERFILE =====
# Multi-stage build for production optimization

# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build application (if needed)
RUN npm run build || echo "No build script found"

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S bikerhub -u 1001

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy dependencies from deps stage
COPY --from=deps --chown=bikerhub:nodejs /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder --chown=bikerhub:nodejs /app ./

# Create necessary directories
RUN mkdir -p logs uploads temp && \
    chown -R bikerhub:nodejs logs uploads temp

# Switch to non-root user
USER bikerhub

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "server.js"]

# Labels for better container management
LABEL maintainer="BikerHUB Team <dev@bikerhub.com>"
LABEL version="2.0.0"
LABEL description="Modern BikerHUB Backend API"
LABEL org.opencontainers.image.source="https://github.com/Tson28/biker--shop"
LABEL org.opencontainers.image.licenses="MIT"
