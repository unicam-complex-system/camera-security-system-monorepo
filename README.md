# camera-security-system-monorepo
The repository contains the sources code for the Camera Security System project(CSS).

# Architecture
The CSS is mainly composed of three 5 components: <br /> <br />
    1. **Frontend**: It is the UI that enables the user to view and use the project in the browser. <br />
    2. **Backend**: It is responsible for authentication, logging detection events, and establish       communication between the frontend and the media server to access the IP Cameras. <br /> 
    4. **Machine learning**: It is responsible for analyzing the camera streams and check if an object is 
    detected. <br />
    5. **NVR & IPCameras**: These are the cameras that captures videos of the surrounding.<br />

In order to successfully run the full project components in your local machine, launch the components in the following order: <br />
1. Install your IP Cameras in the areas desired and connect it to the network. <br />
4. Run the frontend and DB dockerized images. <br />
3. Run the backend. <br />
5. Run the machine learning component. <br />

Below, you will get full details on how to run each component.

# Prerequisites

You should first install [node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) and [docker](https://docs.docker.com/get-docker/) in your machine.

# Frontend and DB
The frontend is the part of the camera security system that enables user to interact with the system visually.

### 1- Define environment variables
To run the frontend you need to have the following environment variables defined in a `.secrets.yml` file in the root directory. You can use the following example

```yaml
NEXT_PUBLIC_BACKEND_URL=https://localhost:8080/
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
# Put the IP address of the NVR
NVR_IP_ADDRESS=
```

### 2- Run the application

Install the required packages by running:
```shell
docker compose up -d
```

# Backend
The backend is the part of the camera security system that is responsible for authentication, logging detection events, and establish communication between the frontend and the media server to access the IP Cameras.

### 1- Define environment variables
To run the backend you need to have the following environment variables defined in a `.env` file in the root directory of the backend. You can use the following example

```yaml
# User to access the backend
CSD_USER=User
# Password to access the backend
CSD_PASSWORD=Password

MONGO_PROTOCOL=mongodb
# mongo:27017 indicates the container called mongo and the port it is listening on
MONGO_HOST=localhost:27017
# DB root username
MONGO_INITDB_ROOT_USERNAME=username
# DB root password
MONGO_INITDB_ROOT_PASSWORD=password

# JWT cryptographic secret
JWT_SECRET=secret
# Telegram bot token
TELEGRAM_TOKEN=api_token
# Should be of the format of BCrypt hash
BCRYPT_SALT=...

# Put the IP address of the NVR
NVR_IP_ADDRESS=
```

You can also run the backend by just adding the telegram token and leave the rest of the config as it is.

### 2- Run the application

Run the application using the following commands:

```shell
cd Backend
npm run css:start
```

# Machine Learning
The machine learning component is responsible for analyzing the camera streams and check if an object is detected.

It is simple to start it using the following commands:

```shell
python ImageRecognition/main.py
```