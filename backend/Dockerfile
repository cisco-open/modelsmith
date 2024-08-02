FROM node:20.15.1

WORKDIR /app/backend

RUN apt-get update && apt-get install -y sshpass rsync bash wget && rm -rf /var/lib/apt/lists/*

COPY backend /app/backend
COPY machine_learning_core /app/machine_learning_core

RUN npm install

RUN chmod +x setup_python_environment.sh

EXPOSE 3000

CMD ["/bin/bash", "-c", "./setup_python_environment.sh \"$CONNECTION_TYPE\" \"$PRIMARY_SSH_HOST\" \"$PRIMARY_SSH_PORT\" \"$PRIMARY_SSH_USERNAME\" \"$PRIMARY_SSH_PASSWORD\" \"$MACHINE_LEARNING_CORE_PATH\" \"$CONDA_SH_PATH\" \"$HUGGING_FACE_ACCESS_TOKEN\" \"$PRIMARY_SSH_PRIVATE_KEY_PATH\" && node src/index.js"]