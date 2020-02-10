FROM node:10.16-alpine

WORKDIR /KitNodejsUltra
COPY /dist/application      /KitNodejsUltra/application
COPY /dist/domain           /KitNodejsUltra/domain
COPY /dist/infrastructure   /KitNodejsUltra/infrastructure

COPY package.json           /KitNodejsUltra/package.json
COPY package-lock.json      /KitNodejsUltra/package-lock.json
COPY node_modules           /KitNodejsUltra/node_modules

COPY .env                   /.env

EXPOSE 3000
ENTRYPOINT ["node", "/KitNodejsUltra/application/src/main.js"]
