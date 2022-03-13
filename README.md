# MERN GUIDELINE

Learn the MERN Stack

- M: MongoDB (Database)
- E: Express.js (Server)
- R: React.js + Next.js + Redux-toolkit (Frontend)
- N: Node.js

만약 Window Subsystem for Linux (WSL)에서 코드를 작업 중이라면 `$ wsl hostname -I`를 Window terminal에 입력 후, localhost를 결과값으로 변경한다.
즉 localhost로 연결되지 않는 경우, 코드를 local computer가 아닌 다른 곳에 작성 했다는 의미이고, localhost를 그에 맞게 변경한다.

- To close server, type `Ctrl + C`
- `$ wsl hostname -I`의 값은 상시 변하므로, local computer에서 RESTAPI test시 계속 변경해 주어야 한다.

```
Window: GET http://localhost:5000/api/users/me
WSL: GET http://172.29.69.223:5000/api/users/me
```

![register](img/register.png)
![reduxdevtool](img/reduxdevtool.png)
![screen1](img/screen1.png)

## Used Technologies

- Node.js
- Database: mongoDB
- Frontend: React.js && Next.js && Redux-toolkit
- Backend: Express.js
- Postman
- VSCode
- github
- Heroku

## Beginning from scratch

Workflow: 1. Server => 2. Database => 3. User authentication => 4. Frontend

## 1. Server: Express

### 1. Initialize project

Open Terminal and type the following command:

```
$ mkdir MERN_guideline
$ cd MERN_guideline
$ npm init
```

- description: Goal setter built with the MERN stack
- entry point (index.js) backend/server.js
- type: "module"
- author: `Heechul Shin <heeshin174@gmail.com>`
- license: (ISC) MIT

type을 module로 해야지만 file을 내보내고/가져올 때, `module.export/require`을 사용하는 CommonJS 대신 `import/export`의 형식을 지원하는 ES6 module을 사용할 수 있습니다.

### 2. Install Dependencies for Backend and Database:

- `express`: Backend framework
- `mongoose`: mongodb framework
- `nodemon`: constantly watch our backend and reload once we save (auto refresh).
- `dotenv`: set the environment variable so that hide all of our secret information.
- `colors`: get color and style

- `body-parser`: POST 요청시 body 데이터값을 읽을 수 있는 구문으로 parsing한다 (Object => Json). Express v4.16.0 기준으로 body-parser가 built-in 되어 별도의 설치 없이 아래와 같이 이용가능하다.

```
const express = require('express');
const app = express();

// json 형태로 parsing
app.use(express.json());
app.use(express.urlencoded( {extended : false } ));

// bodyparser middleware를 사용하지 않으면, post request를 헀을 때 res.body가 undefined이 된다.

app.post('/api/goals', (req, res) => {
    // before adding bodyparser
    console.log(req.body); // undefined

    // after adding bodyparser
    console.log(req.body); // [Object: null prototype] { key: 'value' }
})
```

> `npm i express mongoose dotenv colors`

nodemon은 개발할 때만 사용할 dependency이기 때문에, -D를 붙혀 실제 production에서는 설치하지 않는다.

- `-D`: stands for development dependency because it's not needed for production.

> `npm i -D nodemon`

### 3. Basic Setting for Project

- Add `start`, `server` scripts in `package.json`

`package.json` file

```
"scripts": {
  "start": "node backend/server.js",
  "server": "nodemon backend/server.js"
},
```

- start: start the server. but need to restart the server after every server-side change.
- server (Dev only): start the server. nodemon continuously watch the server, and we won't have to keep updating it.

To use these command, type:

> `npm start`

run the command that is defined in "start" script. This is same as `cd backend; node server.js`

> `npm run server`

- Create `.env` and `backend` directory

- `./.env` file

```
NODE_ENV = development
PORT = 5000
```

`./backend/server.js` file

```
import app from "./app.js";

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
```

`./backend/app.js` file

```
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
```

- Initialize and commit git file (first commit)
- github에 new repository 생성 후, 현재 project와 연결하기

```
$ git init
$ git remote add https://...
$ git remote add origin
$ git add .
$ git commit -m "Initial Project"
```

we put our environment variables, such as API keys, in the `.env` file, so, we don't want `.env` to deploy.

- Add `.env`, `node_modules`, `vscode` to `.gitignore`.

### 4. Routes file

When clients send http request to `/api/goals`, server need to response. We don't want `app.js` file handle all requests.

- `./backend/routes/api/goalRoutes.js` file to handle routing

```
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Set goal" });
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", (req, res) => {
  try {
    res.status(200).json({ message: "Set goal" });
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", (req, res) => {
  try {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
  } catch (err) {
    res.status(400).json({ message: `Fail to update goal ${req.params.id}` });
  }
});

router.delete("/:id", (req, res) => {
  try {
    res.status(200).json({ message: `DELETE goal ${req.params.id}` });
  } catch (err) {
    res.status(400).json({ message: `Fail to delete goal ${req.params.id}` });
  }
});

export default router;
```

- `./backend/app.js` file

```
import goalRoutes from "./routes/api/goalRouters.js";

// use routes
app.use("/api/goals", goalRoutes);
```

now, run the server and open Postman and send http request to `localhost:5000/api/goals`

### 5. Controller

It is better to have a controller that contains all functions for `/api/goals` that handle http requests.

- `./backend/controllers/goalController.js` file

```
/**
 * @route GET api/goals
 * @desc Get All Goals
 * @access Public
 */
export const getGoals = (req, res) => {
  try {
    res.status(200).json({ message: "Set goal" });
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * @route   POST api/goals
 * @desc    Create an Goal
 * @access  Private
 */
export const setGoal = (req, res) => {
  try {
    res.status(200).json({ message: `set goal` });
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * @route   UPDATE api/goals/:id
 * @desc    UPDATE an Goal
 * @access  Private
 */
export const updateGoal = (req, res) => {
  try {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
  } catch (err) {
    res.status(400).json({ message: `Fail to update goal ${req.params.id}` });
  }
};

/**
 * @route   DELETE api/goals/:id
 * @desc    DELETE an Goal
 * @access  Private
 */
export const deleteGoal = (req, res) => {
  try {
    res.status(200).json({ message: `Delete goal ${req.params.id}` });
  } catch (err) {
    res.status(400).json({ message: `Fail to delete goal ${req.params.id}` });
  }
};
```

`./backend/routes/goalRoutes.js` file

```
import {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../../controller/getController.js";

// router.get("/", getGoals);
// router.post("/", setGoal);
// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)
```

### 6. Error and Exception handling

현재 server에 `api/goals`에 post request를 할 때, text를 아무것도 안적어도 status 200으로 성공했다는 message가 뜬다. 이는 error handling을 하지 않았기 떄문이다. 사용자가 `req.body`에 아무것도 입력하지 않았을 경우, status 400으로 실패했다는 message가 뜨게 만든다.

We will use default built in error handler provided by Express.js `throw new Error("message")`

- `./backend/controller/goalController.js` file

```
// If there is nothing in the request body, then throw an error with status 404.
export const getGoals = (req, res, next) => {
  try {
    if (!res.body.text) {
      res.status(404);
      throw new Error("Please add a text field");
    }
    res.status(201).json({ message: "Set goal" });
  } catch (err) {
    next(err);
  }
};
```

위의 코드는 text가 없는 post request를 했을 경우, by default, express js error handler returns 404 error html page. We want to get the json file, so we will override default error message.

- `./backend/middleware/errorMiddleware.js` file

```
// stack trace gives up some additional information (ex. line number), but I only want that if we're in development mode.
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
```

- `./backend/app.js` file

```
import { errorHandler } from "./middleware/errorMiddleware.js";

// override default errorhandler of Express js
app.use(errorHandler)
```

Now if we post empty object, we get json object with the message and then also give us stack only if we are in developing mode.

- Commit git file (second commit)

```
$ git add .
$ git commit -m "Goals controller and routes setup"
```

## 2. Database: MongoDB

### 1. Create Mongo DataBase in the cloud storage and connect to Database

We need a MongoDB URL to be able to connect to.

- Go to Mongodb website (Mongodb Atlas) and create database
  - Mongodb Atlas: cloud baesd
  - Mongodb compass: Database GUI
  - MongoDB URL (MongoDB Atlas): https://www.mongodb.com/

```
Create Project => Create Database => Cluster Tier: M0 Sandbox (Free) => Cloud Provider: AWS
Set User name & User password => Network access IP Address

- Connect => "Connet your application" => DRIVER: Node.js => Get mongoDBURI
- Browse Collections => add Collections called "goals" (Collection is a table)
```

- `.env` file: add `MONGO_URI`

`MONGO_URI = mongodb+srv://Shin:<password>@cluster0.sjhvl.mongodb.net/<myfirstDatabase>?retryWrites=true&w=majority`

- Using this MongoDB URI, connect to the Database in `config/db.js`

- `./backend/config/db.js`

```
import mongoose from "mongoose";

// Connect to Mongo
// mongoose.connect returns Promise object
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // .cyan.underline is from colors package
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err.message);
    process.exit(1); // quit program
  }
};

export default connectDB;
```

- `./backend/app.js`

```
import colors from "colors";
import connectDB from "./config/db.js";

connectDB();
```

### 2. Create Database schemas/models

- Define a database schemas in the seperate folder class models
- In models folder, define `goalModel.js` that returns Goal table

- `./backend/models/goalModel.js`

```
import mongoose from "mongoose";

// Create a goal Schema
const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true, // add updataed day and create day field
  }
);

export default mongoose.model("Goal", goalSchema);
```

- `./backend/controller/goalController.js`

```
import Goal from "../models/goalModel.js";

// GET Goal : 모든 goals 받기
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (err) {
    console.error(err.message);
  }
};

// Create Goal : goal 생성
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (err) {
    console.error(err.message);
  }
};

// Update Goal : goal 수정
export const updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) { // update하고자 하는 goal이 없으면 error 생성
      res.status(400);
      throw new Error("Goal not found");
    }
    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateGoal);
  } catch (err) {
    next(err);
  }
};

// Delete Goal: goal 삭제
export const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    await goal.remove();

    res
      .status(200)
      .json({ id: req.params.id, message: `Delete goal ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};
```

Postman에서 위의 http request가 잘 작동하는지 확인해 볼 수 있다.

```
- GET http://localhost:5000/api/goals
- POST http://localhost:5000/api/goals
Body: x-www-form-urlencoded {
  key: text, value: my first goal
}
or
Headers: {key : Content-Type, value: application/json}
Body: raw {
    {
    "text": "my second goal"
    }
}

- PUT http://localhost:5000/api/goals/:id
Same as POST request

- DELETE http://localhost:5000/api/goals/:id
```

- Commit git file (third commit)

```
$ git add .
$ git commit -m "Initial REST API for goals"
```

## 3. JWT Authentication (Signup and Login)

### 1. Create User Model and Router

JWT은 두 entities가 안전하게 Data를 JSON Object로 주고 받을 수 있게 하기 위해 나온 보안방법이다. 우리는 JWT를 이용하여 이 서버에 회원가입 하고, 로그인하는 functionality를 구현할 것이다.

JWT는 세 가지로 구성되어있다.

1. Header: Algorithm + token type

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

2. Payload: Data

우리는 Payload에 User Id를 담을 것이다.

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

3. VERIFY SIGNATURE

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
)
```

사용자의 name, email, password를 저장하는 user model 생성

- `./backend/models/userModel.js` file

```
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
export default User;
```

goalModel에도 어떤 user의 goal인지를 알 수 있게 user를 추가한다.

- `./backend/models/goalModel.js` file

```
const goalSchema = mongoose.Schema (
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: ...
  }
);
```

- `./backend/app.js`

```
import userRoutes from "./routes/userRouters.js";
app.use("/api/users", userRoutes);
```

user에 대해 3개의 action이 필요하다.

1. register user
2. login
3. get the user information

- `./backend/routes/api/userRouters.js` file

```
import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
} from "../../controller/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);

export default router;
```

- `./backend/controller/userController.js` file

```
/**
 * @route POST api/users
 * @desc Register new user
 * @access Public
 */
export const registerUser = (req, res) => {
  res.json({ message: "Register User" });
};

/**
 * @route POST api/users/login
 * @desc Authenticate a user
 * @access Public
 */
export const loginUser = (req, res) => {
  res.json({ message: "Login User" });
};
/**
 * @route GET api/users/me
 * @desc Get user data
 * @access Private
 */
export const getMe = (req, res) => {
  res.json({ message: "User data" });
};
```

Postman에서 위의 http request가 잘 작동하는지 확인해 볼 수 있다.

```
- POST http://localhost:5000/api/users
- POST http://localhost:5000/api/users/login
- GET http://localhost:5000/api/users/me
```

### 2. Install dependencies for encrpyting password

We can't save plain user password into the database, we need to encrypt the password.

- `bcryptjs`: encrypt password
- `jsonwebtoken`: Json Web Token

> `npm i bcryptjs jsonwebtoken`

- `./backend/controller/userController.js` file

```
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/userModel.js"

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name: name,
      email: email,
      password: hasedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    next(err);
  }
};
```

Postman에서 위의 http request가 잘 작동하는지 확인해 볼 수 있다.

```
- POST http://localhost:5000/api/users
Body: x-www-form-urlencoded {
  key: name, value: Heechul Shin,
  email: heeshin174@gmail.com,
  password: 123456
}
or
Headers: {key : Content-Type, value: application/json}
Body: raw {
    {
    "name": "Heechul Shin",
    "email": "heeshin174@gmail.com",
    "password": 123456
    }
}

- POST http://localhost:5000/api/users/login
Same as above POST request
```

### 3. Generate JWT

- add `JWT_SECRET = abc123` to `.env` file

- `./backend/controller/userController.js` file

```
// Generate JWT
// User Id (payload)를 받아, jwt를 반환
const generateToken = (id) => {
 return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d',})
}

// 그리고, Signup 또는 login 하는 경우, token을 반환
export const registerUser = async (req, res, next) => {
    ...
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } ... };

export const loginUser = async (req, res, next) => {
    ...
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
    ... };
```

Postman에서 register나 login을 실행하면, 이제 다음과 같이, jwt token을 같이 얻을 수 있다. 이 token을 https://jwt.io/ 에 `Encoded`에 넣으면, 이 토큰에 맞는 유저 id를 얻을 수 있다.

```
{
    "_id": "6205f5462a9154a700c507a3",
    "name": "Heechul Shin",
    "email": "heeshin174@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDVmNTQ2MmE5MTU0YTcwMGM1MDdhMyIsImlhdCI6MTY0NDU1ODUxOSwiZXhwIjoxNjQ3MTUwNTE5fQ.D_fIMvhUUgQAekZq1Irih_7ajWR-V6edF4k9iL9Jkr0"
}
```

### 4. Auth Middleware

We will create a custom middleware. Middleware is a function that runs during the request and response cycle.
Once we send a request to the router, middleware runs and check the token.

- `./middleware/authMiddleware.js` file

```
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") // Bearer token
    ) {
      try {
        // Get token from header (split[0] = "Bearer", split[1] = token)
        token = req.headers.authorization.split(" ")[1];
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token
        // Not include req.user.password (password is hashed)
        req.user = await User.findById(decoded.id).select("-password");

        // At the end of the middleware, we want to able to call next() piece of middleware.
        next();
      } catch (error) {
        console.log(error.message);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } catch (err) {
    next(err);
  }
};
```

Once we send a GET request to the `api/users/me`, `protect` middleware runs and check the token.

- `./routes/api/userRoutes.js` file

```
import { protect } from "../../middleware/authMiddleware.js";

router.get("/me", protect, getMe);
```

Postman에서 login하면 주는 token을 가지고 auth Middleware가 잘 작동하는지 확인한다.

```
// token이 없이 getMe()에다 요청하면, error가 뜬다.
GET http://localhost:5000/api/users/me
{
  "message": "Not authorized, no token",
  "stack": "Error: Not authorized, no token\n
}

1. login with existing email and password
POST http://localhost:5000/api/users/login
Body => x-www-form-urlencoded
{
  key: email, value: heeshin174@gmail.com,
  key: password, value: 123456
}
또는
Headers => {Key: Content-Type, Value: application/json }
{
    "email": "heeshin174@gmail.com",
    "password": 123456
}

It returns
{
    "_id": "6205f5462a9154a700c507a3",
    "name": "Heechul Shin",
    "email": "heeshin174@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDVmNTQ2MmE5MTU0YTcwMGM1MDdhMyIsImlhdCI6MTY0NDU2OTQxNiwiZXhwIjoxNjQ3MTYxNDE2fQ.hAwM3ONRM40PDZBOrfPxT9V54gaAC78BNAVbkxS0l6Q"
}

위의 로그인 토큰을 가지고,
GET http://localhost:5000/api/users/me
Authorization => Bearer Token => Token에 login할 때 얻은 token 입력
또는
Headers => {Key: Authorization, Value: token입력 }

It returns { "message": "User data" }, if token is correct.
if token is incorrect, {"message": "Not authorized", "stack": "Error: Not authorized\n }
```

- `./backend/controller/userController.js` file

```
export const getMe = async (req, res, next) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({ id:_id, name:name, email:email });
  } catch (err) {
    next(err);
  }
};
```

### 5. Protect Goal Route

지금은 GET `api/goals`하면, database에 있는 모든 goals를 보여준다. 우리는 특정 User와 연관된 goals만 보여주고 싶다.

- `./backend/routes/api/goalRouters.js`

```
import { protect } from "../../middleware/authMiddleware.js";

router.route("/").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);
```

- `./controller/goalController.js` file

```
export const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
  } catch (err) {
    next(err);
  }
};

export const setGoal = async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(404);
      throw new Error("Please add a text field");
    }
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });
    res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
};
```

Postman으로 특정 user계정에 연결된 goals 보기

```
1. login후 특정 user의 token 얻기
POST http://localhost:5000/api/users/login

2. 특정 user의 goals 보기
GET http://localhost:5000/api/goals
Authorization => Bearer Token => User token입력

3. 특정 user의 goals 추가
POST http://localhost:5000/api/goals
Authorization => Bearer Token => User token입력
Body => x-www-urlencoded => { key: text, value: this is shin goal}

It returns
{
    "user": "6205f5462a9154a700c507a3",
    "text": "this is shin goal",
    "_id": "62062bc456917a1862de86ac",
    "createdAt": "2022-02-11T09:26:28.774Z",
    "updatedAt": "2022-02-11T09:26:28.774Z",
    "__v": 0
}
```

![login-page](./img/postmanlogin.png)

### 6. Update and Delete goals from specific User

User가 다른 User의 goal를 수정 및 삭제 할 수 없도록 만든다.

- `./backend/controller/goalController.js` file

```
import User from "../models/userModel.js";

export const updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateGoal);
  } catch (err) {
    next(err);
  }
};

export const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await goal.remove();

    res
      .status(200)
      .json({ id: req.params.id, message: `Delete goal ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};
```

Postman으로 특정 user계정에 연결된 goals 삭제

```
1. login후 특정 user의 token 얻기
POST http://localhost:5000/api/users/login

2. 특정 user의 goals 삭제
DELETE http://localhost:5000/api/goals/<shingoalsid>
Authorization => Bearer Token => User token입력

모두가 볼수있는 goal: User에 대한 정보가 없다.

{"_id":{"$oid":"620576f0a8685ddcf21dbb94"},
"text":"updated goal",
"createdAt":{"$date":{"$numberLong":"1644525296473"}},
"updatedAt":{"$date":{"$numberLong":"1644525799402"}},
"__v":{"$numberInt":"0"}}

특정 User만 볼수있는 goal: User에 대한 정보도 포함한다.

{"_id":{"$oid":"62062bc456917a1862de86ac"},
"user":{"$oid":"6205f5462a9154a700c507a3"},
"text":"this is shin goal",
"createdAt":{"$date":{"$numberLong":"1644571588774"}},
"updatedAt":{"$date":{"$numberLong":"1644571588774"}},
"__v":{"$numberInt":"0"}}
```

![goaldb](img/goaldb.png)

![userdb](img/userdb.png)

![deletegoaldb](img/deletegoaldb.png)

- Commit git file (Fourth commit)

```
$ git add .
$ git commit -m "Authentication and Authorization"
```

## 4. Client: React && Next && Redux-toolkit

### 1. Create client folder

- create new directory 'client' and create new react app with next.js + typescript

```
$ npx create-next-app@latest --typescript
// 또는
$ npx create-next-app@latest --ts
```

create-react-app은 기존의 backend에서 쓰는 `package.json`과는 다른 새로운 `package.json`을 만들어 내는데, client의 package.json에 "proxy" value를 적어놓는 것이 중요하다. proxy는 개발할 때만 쓰이기 때문에 나중에는 신경쓰지 않아도 된다.

예를 들어 `axios.get('http://localhost:5000/api/items')`와 같은 긴 주소명을 `axios.get('api/items')`와 같이 짧게 쓰는 것을 가능하게 만들어 준다.

- `./client/package.json` file

```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "12.1.0",
    "react": "17.0.2",
    "react-dom": "17.0.2"
  },
  "devDependencies": {
    "@types/node": "17.0.21",
    "@types/react": "17.0.39",
    "eslint": "8.10.0",
    "eslint-config-next": "12.1.0",
    "typescript": "4.6.2"
  },
  "proxy": "http://localhost:5000/"
}
```

하지만, Next에서 위의 `proxy`는 제대로 동작하지 않는다. 제대로 proxy하려면 `next.config.js` file에 작성해야 한다.

- `./client/next.config.js` file

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/api/users/:slug*",
      destination: `http://localhost:5000/api/users/:slug*`,
    },
    {
      source: "/api/goals/:slug*",
      destination: `http://localhost:5000/api/goals/:slug*`,
    },
  ],

  images: {
    domains: ["tailwindui.com"],
    path: "/",
  },
};

module.exports = nextConfig;
```

이렇게 `rewrites()`를 작성하면 source 로 오는 http request를 destination으로 redirect한다.

우리는 두 개의 `package.json`이 있기 때문에 `client` folder내에서 `npm start`를 입력하면 react가 실행되고, root directory에서 `npm start`를 입력하면 `./backend/server.js`가 실행된다. 이 두 개의 command를 root에서 동시에 사용하기 위해 `concurrently` dependency를 설치한다.

- `concurrently`: run more than one `npm` scripts at a time, so that we are able to run the server and the client at a same time.
- root directory에서 `$ npm i -D concurrently`

- `./package.json` file

```
{
  "name": "mern_guideline",
  "version": "1.0.0",
  "description": "Goal setter built with the MERN stack",
  "main": "backend/server.js",
  "type": "module",
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm run dev --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "client-install": "npm install --prefix client"
  },
  ...
}
```

- `"client": "cd client && npm run dev"` 또는 `"client": "npm run dev --prefix client"`: 사용자가 client folder를 들어가지 않고도 root에서 react app을 실행
- `"client": "client-install": "npm install --prefix client"` 또는 `"client": "cd client && npm install"`: client folder의 dependencies를 install
- `"dev": "concurrently \"npm run server\" \"npm run client\""`: concurrently library를 이용하여 client와 server를 동시에 실행

root directory에서 다음의 command을 입력:

```
// Run the React client only
$ npm run client

// Install dependencies for client
$ npm run client-install

// Install dependencies for backend
$ npm i
또는
$ npm install

// Run the client & server together with concurrently
// Server runs on http://localhost:5000 and client on http://localhost:3000
$ npm run dev
```

### 2. Install dependencies for client

Go to the client folder and install dependencies for client.

- `redux-toolkit`: state관리 library
- `react-redux`: react 개발환경의 redux
- `tailwindcss`: css framework로 기본적인 styling를 제공합니다.
- `headlessui`: tailwindcss와 같이 사용되는 react, vue css library
- `heroicons`: tailwindcss와 같이 사용되는 react, vue SVG icons library
- `axios`: Promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase)
- `react-toastify`: shows error, alert, and success alert

```
$ cd client
$ npm i @reduxjs/toolkit @headlessui/react @heroicons/react react-redux axios react-toastify

// Install Tailwind CSS with Next.js
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

- `./client/tailwind.config.js` file

```
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- `./client/styles/globals.css` file

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`postcss/config.js`와 `tailwind.config.js`가 complie이 안된다면 adding `prettier` in `.eslintrc file`

- `./client/.eslintrc.json` file

```
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

- Run your build process with `npm run dev`.

이제 이 project에서 Tailwindcss와 Next.js를 동시에 사용할 수 있게 되었다.

- [Tailwind with Next.js](https://tailwindcss.com/docs/guides/nextjs)

### 3. Create component directory and build a layout

```
// components directory 생성
$ mkdir components
$ cd components
$ touch Navbar.tsx
$ touch Footer.tsx
$ touch Layout.tsx

// 각각의 file에다 rafce 입력
```

set primary color and many other colors

- `./client/tailwind.config.js` file

```
module.exports = {
  ...
  theme: {
    extend: {
      colors: {
        primary: "#ff4800",
        gold: "#ffd700",
      },
    },
  },
  plugins: [],
};

// `text-primary`, `text-gold`와 같이 사용해
// 지정한 색깔을 사용할 수 있다.
```

tailwindcss를 이용해 나만의 class만들기

- `./client/styles/globals.css` file

```
@tailwind base;
@tailwind components;
@tailwind utilities;

.btn-purple {
  @apply text-indigo-600 hover:text-indigo-500;
}
```

`@apply`를 이용하면 여러 tailwindcss를 하나의 className으로 묶을 수 있다.

```
<a className="btn-purple">Sign in</a>
// is equivalent to
<a className="text-indigo-600 hover:text-indigo-500">Sign in</a>
```

Tailwindcss website에 있는 Navbar, Footer template를 가져와 다음에 붙여넣기 후 내 project에 맞게 변경한다.

- `./client/components/Navbar.tsx`
- `./client/components/Footer.tsx`

Tip: Next에서 page간 이동은 `Link`, img는 `Image` tag를 사용한다.

- `Link`는 anchor `<a>` tag을 자식으로 가져야만 한다.

```
import Image from "next/image"
import Link from "next/link"

<a className="btn-purple" href="/login">Sign in</a>
// is equivalent to
<Link href="login">
<a className="btn-purple">Sign in</a>
<Link>

<img className="h-8 w-auto" alt="Logo" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" />
// is equivalent to
<Image
  className="sm:h-10 cursor-pointer"
  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
  alt="Logo"
  height="32"
  width="100%"
/>
```

To use external img source, add domain name to `next.config.js` file

- `next.config.js` file

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com"],
    // loader: "custom",
    path: "/",
  },
};

module.exports = nextConfig;
```

- `./client/components/Layout.tsx` file

```
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
```

- `./client/_app.tsx` file

```
import "../styles/globals.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

- Commit git file

```
$ cd ..
$ git add .
$ git commit -m "set up client with tailwindcss and basic layout"
```

### 4. Login and Register pages

- Create login and register page
- Tailwindcss website에 있는 login template를 가져와 다음에 붙여넣기 후 내 project에 맞게 변경한다.

- `./client/pages/Login.tsx` file
- `./client/pages/Register.tsx` file

login과 register는 비슷하기 때문에, 조금만 변경해주면 된다.

- Commit git file

```
$ git add .
$ git commit -m "login and  register UI"
```

### 5. Redux-toolkit Auth setup

- `./client/features/auth/authSlice.ts`
  - `authSlice`는 user authentication에 대한 reducer, action creator function, initial state를 모아둔 redux-toolkit function 이다.
- `./client/features/auth/authService.ts`
  - `authService`는 user authentication에 대한 http request를 담당하는 file이다.
- `./client/app/store.ts`
  - `store`는 state를 관리하고 update하는 redux store이다.
- `./client/app/hooks.ts`
  - `hooks`는 typescript에서 `useSelector(), useDispatch()`를 간단하게 사용하기 위한 custom hook이다.
- `./client/features/userData.ts`

  - `userData`는 사용자가 입력할 데이터 interface이다.

- `./client/pages/_app.tsx` file

```
import "../styles/globals.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
```

- `./client/components/Navbar.tsx` file
  - Navbar에 user가 있으면 sign out를 없으면 sign up, log in를 보여주는 conditional statement 추가
- `./client/components/Spinner.tsx` file

  - 로딩중에 보여줄 Spinner

- `./client/pages/register.tsx` file
- `./client/pages/Login.tsx` file

login과 register는 비슷하기 때문에, 조금만 변경해주면 된다.

```
// useSelector: used to select from the state. bring user, isLoading, isError, etc from state.
// useDispatch: dispatch the function like reguster, Asyncthunk functions, reset reducer from

type UserData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const register = () => {
  const [formData, setformData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useRootState(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      // navigate to 'pages/index.tsx' page
      router.push("/");
    }

    dispatch(reset);
  }, [user, isLoading, isError, isSuccess, message]);

  const onChange = (e: React.FormEvent) => {
    setformData((prevState) => ({
      ...prevState,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(registerUser(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  ...
}
```

- Commit git file

```
$ git add .
$ git commit -m "user login and register in UI/UX"
```

### 6. Redux-toolkit Goal set up

- `./client/features/goals/goalSlice.ts`
  - `goalSlice`는 goal에 대한 reducer, action creator function, initial state를 모아둔 redux-toolkit function 이다.
- `./client/features/goals/goalService.ts`
  - `goalService`는 goal에 대한 http request를 담당하는 file이다.
- `./client/features/goalData.ts`

  - `goalData`는 사용자가 입력할 goal data interface이다.

- `./client/components/Dashboard.tsx`
  - `Dashboard`는 사용자의 goal를 보여주는 UI이다.
- `./client/components/GoalForm.tsx`
  - `GoalForm`는 사용자의 goal를 input 받는 form이다.
- `./client/components/GoalItem.tsx`
  - `GoalItem`는 사용자의 goal를 보여주는 UI이다.

## 5. Deployment

- `./backend/`

```
import path from 'path';

// Serve static assets if in production
// Serve frontend
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("please set to production");
  });
}
```

`env` file에 `NODE_ENV = production`를 입력하면 이제 `https:localhost:5000`으로 접속해도 client directory의 UI를 볼 수 있다.

- go to client directory and build static assets.

```
$ cd client
$ npm run build
// this will generate build directory
```

- go to 'https://heroku.com' and create account
- download `heroku cli` (command line)

```
$ heroku --version
$ heroku login

// create heroku app
// This should be unique for all heroku app
$ heroku create uniqueprojectname
```

- go to application and `Settings > Reveal Config Vars` to set enviornment variables in `.env` file

- add heroku postbuild script in `./package.json`

```
"scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm run dev --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "client-install": "npm install --prefix client",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  },
```

`heroku-postbuild`는 heroku server가 자동으로 client directory의 dependencies와 build static assets를 실행한다.

- push code using git command

```
$ git add .
$ git commit -m 'Prepare deployment'
$ git remote https:...
$ git push heroku main

$ heroku open
// open heroku app in the browser
```

## Reference

- [Youtube Link](https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=3&ab_channel=TraversyMedia)
- [Github](https://github.com/bradtraversy/mern-tutorial)
