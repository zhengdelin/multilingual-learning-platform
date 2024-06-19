FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npm run build moe-dict

CMD [ "node", "./dist/apps/moe-dict/main.js" ]