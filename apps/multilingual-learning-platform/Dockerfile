FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npm run build multilingual-learning-platform

CMD [ "node", "./dist/apps/multilingual-learning-platform/main.js" ]
EXPOSE 3000