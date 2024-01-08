FROM node:18

WORKDIR /app

COPY ./package-lock.json /app
COPY ./package.json /app

RUN npm install

COPY ./index.js /app/index.js

CMD npm start

