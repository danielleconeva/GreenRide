# Use Node.js LTS
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (only production for deployment)
RUN npm install --production

# Copy the rest of your app
COPY . .

# Expose port (Fly.io will map it automatically)
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
