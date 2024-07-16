# Step 1: Build the angular app
FROM node:20.15.1

WORKDIR /app/backend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm run", "start:prod"]