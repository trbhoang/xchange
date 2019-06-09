FROM node:10.15.3-alpine
WORKDIR /src

COPY ./package.json .
RUN npm install --only=production

COPY app app
COPY public public
COPY .env .env
COPY server.js server.js

CMD node ./server.js
