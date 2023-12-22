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
```
Then you can run
```bash
$ docker compose up -d
```
