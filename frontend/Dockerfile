FROM node:20.15.1

WORKDIR /app/frontend

COPY . .

RUN npm install

RUN npm run build:prod

WORKDIR /app/frontend/server
RUN npm install

EXPOSE 4200

CMD ["node", "server.js"]