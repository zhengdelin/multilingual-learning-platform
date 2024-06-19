FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npm run build redis-cache

CMD [ "node", "./dist/apps/redis-cache/main.js" ]