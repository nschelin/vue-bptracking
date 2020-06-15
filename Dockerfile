FROM node:10

WORKDIR /app
COPY package*.json ./
COPY vue.config.js ./
COPY .eslintrc.js ./

RUN npm install
RUN npm install -g http-server

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["http-server", "dist"]