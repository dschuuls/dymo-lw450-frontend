FROM node:lts-alpine3.15

WORKDIR /app

COPY public ./public
COPY config.json index.ejs package.json server.js ./

RUN npm install

CMD npm start