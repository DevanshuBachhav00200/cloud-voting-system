# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Expose the app port
EXPOSE 8080

# Start the app
CMD ["node", "index.js"]

