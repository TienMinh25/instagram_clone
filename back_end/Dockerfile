# Use node runtime image version 21-alpine
FROM node:21-alpine

# Create backend folder
RUN mkdir /backend
WORKDIR /backend

# Copy the package.json and package-lock.json to the ./backend
COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 5001

CMD ["npm", "run", "start"]


