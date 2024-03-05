FROM node:current-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production
ENV PORT 8000
EXPOSE 8000

ARG DATABASE_URL
ARG REDIS_URI

ENV DATABASE_URL=$DATABASE_URL
ENV REDIS_URI=$REDIS_URI

CMD ["npm", "start"]
