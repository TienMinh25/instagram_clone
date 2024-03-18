# Use node runtime image version 21-alpine
FROM node:21-alpine as base

# Create backend folder
RUN mkdir /backend
WORKDIR /backend

RUN npm install -g sequelize-cli

# RUN apt-get update \
#     && apt-get install -y build-essential \
#     && apt-get install -y python

FROM base as dev

ENV NODE_ENV development
ENV DB_PASSWORD testSomethingNow
ENV DB_PORT 3306
ENV DB_HOST database

# Copy the package.json and package-lock.json to the ./backend
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]

FROM base as test

ENV NODE_ENV test
ENV DB_PASSWORD testSomethingNow
ENV DB_PORT 3306
ENV DB_HOST database

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json

COPY . .

RUN npm install \
    && npx sequelize db:migrate \
    && npm run test
