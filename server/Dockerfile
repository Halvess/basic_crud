FROM node:lts

WORKDIR /usr/src/server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3030