# Use the official Node.js 18 image as a base
FROM node:18

# Create and set the working directory
WORKDIR /var/www/tokotitoh_api

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code to the container
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]
