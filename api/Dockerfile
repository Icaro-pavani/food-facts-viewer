FROM node:16

WORKDIR /usr/src

COPY . .

EXPOSE 4000

RUN npm i && nom run build

CMD ["npm", "start"]