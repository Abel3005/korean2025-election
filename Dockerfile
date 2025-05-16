# Base image with Node 18.20.8
FROM node:18.20.8-bullseye

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app inside the image
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port for Fly.io
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]