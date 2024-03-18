# Technology and framework used in project clone instagram:

# Front end:

- **ReactJS**
- **Chakra** (provide much more component built, so it allows you to have more time focus features)
- **react-icons** (support multiple icon to use)
- **react-router-dom** (navigation page)

# Back end:

- **NodeJS (expressJS)**
- **Sequelize (ORM) (sequelize, sequelize-cli)**
- Driver adapter: **mysql2**
- **jest** (Unit test), **suppertest** (support test for http/rest api), **sequelize-test-helpers, sinon, chai**(test for db)
- **body-parser** - use to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
- **cookie-parser** - use to parse **Cookie header** and populate **req.cookies** with an object keyed by the cookie names.
- **jsonwebtoken** - in order to use JWT for authentication.

# Features:

- Login, Logout, Register
- Comment, post (edit, create, delete)
- Realtime chat
- Join group

# How to use: 🤔

## There are 2 ways to run the project

### First way: 🫰🫰

- Open your terminal and pull project on main branch into your laptop or PC.

```sh
$ git pull https://github.com/TienMinh25/instagram_clone.git
```

**NOTE:**

- You can also choose your directory you need to pull.

* Then open project on IDE which you prefer then type text below into terminal:

```sh
$ npm install
```

- First, you need a local database (use mysql)
```
Please config root and password for your local database,
then open file .env (./back_end/.env) and modify it.
```

- Run backend

```sh
$ cd back_end
$ npm run dev
```

- Run frontend

```sh
$ cd fron_end
$ npm run dev
```

### Second way: 🏃‍♂️🏃‍♂️ (Recommended)

- First, you aslo need to pull project to your device 😄
- Then you must have docker on your machine, then ensure docker is running
- Open your terminal, make sure you are in the root ~ **/instagram_clone**, then type:

```sh
~/<parent_directory>/instagram_clone
$ docker-compose up --build
```

- Then open new terminal, and type:
```sh
$ docker exec -it backend_node sh
$ sequelize db:migrate
```

- If you need to termianted that, you just type:

```sh
$ docker-compose down
```

- That's so easy, right 😆😚😎
- Open your browser, and type http://localhost:80

# Future Improvements (Planned)
# Author:

```
Name: Lê Văn Tiến Minh
Gmail: letienminh2512@gmail.com
```

# Summary: 🥀🥀🥀

> Thank you everyone for visiting my repo, please give each one **a star** and you can view this repo as reference. This is also my best practice repo at the moment.
