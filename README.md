# camera-security-system-monorepo
The repository contains the sources code for the Camera Security System project.

# Backend

## Just Run

Firstly add .secrets.yml file to root directory using the following template
```yaml
# mongodb+srv is the protocol when connecting to cloud mongodb
MONGO_PROTOCOL=mongodb
# mongo:27017 indicates the container called mongo and the port it is listening on
MONGO_HOST=mongo:27017
# DB root username
MONGO_INITDB_ROOT_USERNAME=username
# DB root password
MONGO_INITDB_ROOT_PASSWORD=password
# JWT cryptographic secret
JWT_SECRET=secret
# User to access the backend
CSD_USER=User
# Password to access the backend
CSD_PASSWORD=Password
# Telegram bot token
TELEGRAM_TOKEN=api_token
# Should be of the format of BCrypt hash
BCRYPT_SALT=...
# folder path. It is relative to the backend location. The folder directory should never be absolute or start with / 
HLS_OUTPUT_DIRECTORY=HLS_OUTPUT
# Master file name of HLS stream
HLS_FILE_NAME=index.m3u8
```
Then you can run
```bash
$ docker compose up -d
```

# Frontend

This is the frontend part of the camera security system. It is this part that enables
user to interact with the system visually.

### 0- Prerequisite
You should first install node.js in your machine.
You can get more information [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
### 1- Open terminal

First open the terminal and move to the frontend directory.

If you are currently in root directory of this repo. Type the following in the terminal to change directory:
```bash
cd ./Frontend/
```

### 2- Define environment variables
In order to run the application you will need to define the environment variable by creating
.env file in the root Frontend directory.

Copy the content of .env_example found in the Frontend root directory and change the variable values
accordingly. 
```yaml
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/
```

### 3- Install packages

Install the required packages by running:
```yaml
npm install
```

### 4- Run the application

Run the application using this command:

```yaml
npm run dev
```
Note: If you are running the backend locally make sure that you followed the steps in the [backend section](#backend). 
