FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["sh", "-c", "yarn setup && node dist/src/index.js server"]
