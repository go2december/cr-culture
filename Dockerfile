FROM node:25-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --force

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]
