# camera-security-system-monorepo
The repository contains the sources code for the Camera Security System project.

# Backend

## Just Run

Firstly add .secrets.yml file to root directory using the following template
```text
MONGO_PROTOCOL=mongodb
MONGO_HOST=mongo:27017
MONGO_INITDB_ROOT_USERNAME=username
MONGO_INITDB_ROOT_PASSWORD=password
JWT_SECRET=secret
CSD_USER=User
CSD_PASSWORD=Password
TELEGRAM_TOKEN=api_token
BCRYPT_SALT=...
```
Then you can run
```bash
$ docker compose up -d
```
