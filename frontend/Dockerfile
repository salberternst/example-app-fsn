FROM node:18

WORKDIR /app

COPY ./package-lock.json /app
COPY ./package.json /app

RUN npm install

COPY ./public /app/public
COPY ./src /app/src

CMD npm start

