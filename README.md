# camera-security-system-monorepo
The repository contains the sources code for the Camera Security System project(CSS).

# Architecture
The CSS is mainly composed of three 5 components: <br /> <br />
    1. **Frontend**: It is the UI that enables the user to view and use the project in the browser. <br />
    2. **Backend**: It is responsible for authentication, logging detection events, and establish       communication between the frontend and the media server to access the IP Cameras. <br /> 
    4. **Machine learning**: It is responsible for analyzing the camera streams and check if an object is 
    detected. <br />
    5. **NVR & IPCameras**: These are the cameras that captures videos of the surrounding.<br />

In order to successfully run the full project components in your local machine, launch the components in the following order: <br /> <br />
    1.  Install your IP Cameras in the areas desired and connect it to the network. <br />
    2.  Run the media server.  <br />
    3.  Run the backend. <br />
    4.  Run the frontend. <br />
    5.  Run the machine learning component. <br />

Below, you will get full details on how to run each component.

# Prerequisites

You should first install node.js in your machine.
You can get more information [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

You should also have docker installed in your machine.

# Backend

## Just Run

To run the backend you need to have the following environment variables defined in a .env file in the root directory of the backend. You can use the following example

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
# Put the IP address of the NVR
NVR_IP_ADDRESS=
## Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/
```
Then you can run


### 2- Define environment variables
In order to run the application you will need to define the environment variable by creating
.env file in the root Backend directory.

Copy the content of .env_example found in the Backend root directory and change the variable values
accordingly. You can also run the backend by just adding the telegram token and leave the rest of the config as it is.

### 3- Install packages and Run the application

Run the application using the following commands:

```shell
cd Backend
npm run css:start
```
Note: If you are running the backend locally make sure that you followed the steps in the [Media Server Section](#media-server). 

# Frontend

This is the frontend part of the camera security system. It is this part that enables
user to interact with the system visually.

### 0- Prerequisite
You should first install node.js in your machine.
You can get more information [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
### 1- Open terminal

First open the terminal and move to the frontend directory.

If you are currently in root directory of this repo. Type the following in the terminal to change directory:
```yaml
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
