# Use an official Node.js image as the base
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /frontend-app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Copy the entire content of the React app to the container
COPY . .

# Build the React app
RUN npm run build

# Set up an HTTP server to serve the built React app
#RUN npm install -g serve

# Expose the port on which the server will run (default is 5000)
EXPOSE 3000

# Define the command to start the server
CMD ["serve", "-s", "build"]