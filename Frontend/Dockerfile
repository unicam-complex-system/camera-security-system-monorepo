# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
