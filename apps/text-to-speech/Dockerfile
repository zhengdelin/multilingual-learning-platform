FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npm run build text-to-speech

CMD [ "node", "./dist/apps/text-to-speech/main.js" ]