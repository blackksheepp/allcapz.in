FROM node:22-alpine AS build
WORKDIR /app

# Install system dependencies required by Prisma
RUN apk add --no-cache \
    openssl \
    zlib \
    libgcc \
    musl

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine
ENV NODE_ENV=production
ENV PORT=8000
WORKDIR /app

# Install system dependencies in the production image as well
RUN apk add --no-cache \
    openssl \
    zlib \
    libgcc \
    musl

COPY --from=build /app ./
EXPOSE 8000

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

CMD ["npm", "start"]