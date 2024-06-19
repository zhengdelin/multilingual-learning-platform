FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npm run build speech-to-text

CMD [ "node", "./dist/apps/speech-to-text/main.js" ]