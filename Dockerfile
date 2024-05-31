FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine

ENV NODE_ENV=production
ENV PORT=8000

WORKDIR /app

COPY --from=build /app ./

EXPOSE 8000

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["npm", "start"]
