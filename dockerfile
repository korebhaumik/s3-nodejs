FROM node:current-alpine3.17

WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./src /app/src
EXPOSE 1337
# VOLUME /app
CMD ["npm", "run", "dev"]