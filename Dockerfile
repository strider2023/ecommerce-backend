FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i --silent
RUN npm install pm2 -g

COPY . .

EXPOSE 6000
CMD ["pm2-runtime", "src/app.js"]