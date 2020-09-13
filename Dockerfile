FROM node:12-slim as client-build

WORKDIR /app
COPY ./client ./client

WORKDIR /app/client
RUN npm install && npm run build

FROM node:12-slim as server-install
WORKDIR /app
COPY ./server ./server

WORKDIR /app/server
RUN npm install

COPY --from=client-build /app/client/dist /app/server/src/public

EXPOSE 8080

CMD ["npm", "start"]

