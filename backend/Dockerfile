FROM node:24-slim

WORKDIR /app

# Copy package config and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port and start
ENV PORT=3001
EXPOSE 3001

CMD ["npm", "start"]
