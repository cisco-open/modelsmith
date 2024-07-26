FROM node:20.15.1

WORKDIR /app/backend

COPY . .

RUN npm install

RUN echo "PORT=3000" > .env && \
    echo "MACHINE_LEARNING_CORE_PATH=${MACHINE_LEARNING_CORE_PATH}" >> .env && \
    echo "CONDA_SH_PATH=${CONDA_SH_PATH}" >> .env && \
    echo "HUGGING_FACE_ACCESS_TOKEN=${HUGGING_FACE_ACCESS_TOKEN}" >> .env && \
    echo "CONNECTION_TYPE=${CONNECTION_TYPE}" >> .env && \
    echo "PRIMARY_SSH_HOST=${PRIMARY_SSH_HOST}" >> .env && \
    echo "PRIMARY_SSH_PORT=${PRIMARY_SSH_PORT}" >> .env && \
    echo "PRIMARY_SSH_USERNAME=${PRIMARY_SSH_USERNAME}" >> .env && \
    echo "PRIMARY_SSH_PASSWORD=${PRIMARY_SSH_PASSWORD}" >> .env && \
    echo "PRIMARY_SSH_PRIVATE_KEY_PATH=${PRIMARY_SSH_PRIVATE_KEY_PATH}" >> .env

EXPOSE 3000

CMD ["node", "src/index.js"]