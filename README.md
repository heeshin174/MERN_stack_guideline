# MERN GUIDELINE

Learn the MERN Stack

- M: MongoDB (Database)
- E: Express.js (Server)
- R: React.js (Frontend)
- N: Node.js

만약 Window Subsystem for Linux (WSL)에서 코드를 작업 중이라면 `$ wsl hostname -I`를 Window terminal에 입력 후, localhost를 결과값으로 변경한다.
즉 localhost로 연결되지 않는 경우, 코드를 local computer가 아닌 다른 곳에 작성 했다는 의미이고, localhost를 그에 맞게 변경한다.

- `$ wsl hostname -I`의 값은 상시 변하므로, local computer에서 RESTAPI test시 계속 변경해 주어야 한다.

```
Window: GET http://localhost:5000/api/users/me
WSL: GET http://172.29.69.223:5000/api/users/me
```

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
$ mkdir MERN_SHOPPING_LIST
$ cd MERN_SHOPPING_LIST
$ npm init
```

- description: Goal setter built with the MERN stack
- entry point (index.js) server.js
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

`body-parser` library: POST 요청시 body 데이터값을 읽을 수 있는 구문으로 parsing한다 (Object => Json). Express v4.16.0 기준으로 body-parser가 built-in 되어 별도의 설치 없이 아래와 같이 이용가능하다.

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

`./.env` file

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

- Initialize and Commit git file (first commit)

```
> $ git init
> $ git add .
> $ git commit -m "Initial Project"
```

we put our environment variables in the `.env` file, so, we don't want `.env` to deploy.

- Add `.env`, `node_modules` to `.gitignore`.

### 4. Routes file

When clients send http request to `/api/goals`, server need to response. We don't want `app.js` file handle all requests.

- Create `./backend/routes/api/goalRoutes.js` folders and file to handle routing.

`./backend/routes/api/goalRoutes.js` file

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

`./backend/app.js` file

```
import goalRoutes from "./routes/api/goalRouters.js";

// use routes
app.use("/api/goals", goalRoutes);
```

now, run the server and open Postman and send http request to `localhost:5000/api/goals`

### 5. Controller

It is better to have a controller that contains all functions for `/api/goals` that handle http requests.

`./backend/controllers/goalController.js` file

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

현재 server에 `api/goals`에 post request를 할 때, text를 아무것도 안적어도 status 200으로 성공했다는 message가 뜬다. 이는 error handling을 하지 않았기 떄문이다. 사용자가 req.body에 아무것도 입력하지 않았을 경우, status 400으로 실패했다는 message가 뜨게 만든다.

We will use default built in error handler provided by Express js `throw new Error("message")`

`./backend/controller/goalController.js` file

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

`./backend/middleware/errorMiddleware.js` file

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

`./app.js` file

```
import { errorHandler } from "./middleware/errorMiddleware.js";

// override default errorhandler of Express js
app.use(errorHandler)
```

Now if we post empty object, we get json object with the message and then also give us stack only if we are in developing mode.

- Commit git file (second commit)

```
> $ git add .
> $ git commit -m "Goals controller and routes setup"
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

- `app.js`

```
import colors from "colors";
import connectDB from "./config/db.js";

connectDB();
```

### 2. Create Database schemas/models

- Define a database schemas in the seperate folder class models
- In models folder, define `goal.js` that returns Goal table
- create `./models/goal.js` folder and file

- `./models/goal.js`

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

- `./controller/goalController.js`

```
import Goal from "../models/goal.js";

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
> $ git add .
> $ git commit -m "Initial REST API for goals"
```

## 3. JWT Authentication (Signup and Login)

### 1. Create User Model and Router

JWT은 두 파티가 안전하게 Data를 JSON Object로 주고 받을 수 있게 하기 위해 나온 보안방법이다. 우리는 JWT를 이용하여 이 서버에 회원가입 하고, 로그인하는 functionality를 구현할 것이다.

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

3개의 action이 필요하다.

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

### 2. Install dependencies for encrpyt

We can't save plain user password into the database, we need to encrypt the password.

- `bcryptjs`: encrypt password
- `jsonwebtoken`: JWT

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

- `./controller/userController.js` file

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

Postman으로 Heechul Shin계정에 연결된 goals 보기

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

- `./controller/goalController.js` file

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
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
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

Postman으로 Heechul Shin계정에 연결된 goals 삭제

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
> $ git add .
> $ git commit -m "Authentication and Authorization"
```

## 4. Client: React && Next

### 1. Create client folder

- create new folder 'client'
- Inside the client folder, create new react app with redux-toolkit

> `npx create-react-app client --template redux`

또는,

> `npm install @reduxjs/toolkit`

create-react-app은 기존의 package.json과는 다른 새로운 package.json을 만들어 내는데, 새로운 package.json에 "proxy" value를 적어놓는 것이 중요하다. proxy는 개발할 때만 쓰이기 때문에 나중에는 신경쓰지 않아도 된다.

예를 들어 `axios.get('http://localhost:5000/api/items')`와 같은 긴 주소명을 `axios.get('api/items')`와 같이 짧게 쓰는 것을 가능하게 만들어 준다.

- package.json in client folder

```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  ...
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:5000/"
}
```

우리는 두 개의 `package.json`이 있기 때문에 `client` folder에서 `npm start`를 입력하면 react가 실행되고,
서버가 있는 folder에서 `npm start`를 입력하면 server.js가 실행된다.

우리는 이런 두 개의 command를 MERN_SHOPPING_LIST folder에서 동시에 사용하고 싶다.

이때, 우리가 설치한 dependency `concurrently`가 역할을 해준다.

- MERN_SHOPPING_LIST folder의 package.json에 `"client": "cd client && npm start"` 또는 `"client": "npm start --prefix client"`를 적는다. 이는 사용자가 client folder를 들어가지 않고도 client folder의 react app을 실행시킨다.

Run the React client only

> `npm run client`

- MERN_SHOPPING_LIST folder의 package.json에 "client": "client-install": "npm install --prefix client" 또는 "client": "cd client && npm install"를 적는다.

  이는 사용자가 client folder를 들어가지 않고도 client folder의 dependencies를 install할 수 있게 해준다.

Install dependencies for client

> `npm run client-install`

server side의 dependencies를 설치하려면, MERN_SHOPPING_LIST folder에서 다음을 입력한다.

> `npm install`

- `concurrently`: run more than one `npm` scripts at a time, so that we are able to run the server and the client at a same time.

concurrently 사용법:

Remember to surround separate commands with quotes:

> `concurrently "command1 arg" "command2 arg"`

Otherwise concurrently would try to run 4 separate commands: command1, arg, command2, arg.

In package.json, escape quotes:

> `"start": "concurrently \"command1 arg\" \"command2 arg\""`

- MERN_SHOPPING_LIST folder의 package.json에 "dev": "concurrently \"npm run server\" \"npm run client\""를 적는다.

  이는 concurrently를 이용하여 사용자가 client와 server를 동시에 실행할 수 있게 해준다.

Run the client & server with concurrently

Server runs on http://localhost:5000 and client on http://localhost:3000

> `npm run dev`

```
// package.json in mern_shopping_list folder
{
  "name": "mern_shopping_list",
  "version": "1.0.0",
  "description": "Shopping List built with the MERN stack",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "client-install": "npm install --prefix client"
  },
  ...
}
```

### 2. Install dependencies for client

Go to the client folder and install dependencies.

> `cd client`

- `bootstrap`: frontend dev에 대한 구조를 미리 만들어둔 프레임워크입니다. 기본적인 css, js를 제공합니다.
- `reactstrap`: bootstrap component를 react component로 사용할 수 있게 만들어 준다.
- `react-transition-group`: exposes simple components useful for defining entering and exiting transitions.

> `npm i bootstrap reactstrap react-transition-group`

### 3. src folder에 component folder를 만들기

- src folder에 component folder를 만든다.
- component folder에 AppNavbar.js를 만든다.

VScode extension인 `ES7+ React/Redux/React-Native snippets`을 download하면 `rafce`만 code에 입력하면 arrow function이 자동적으로 완성된다.

AppNavbar.js는 reactstrap의 Navbar Toggler component를 사용할 것이다.
이 Navbar를 클락하면 그 안에 있는 links가 보이는 형식이다.

reactstrap: https://reactstrap.github.io/?path=/docs/components-navbar--navbar

위의 링크로 가서 `component/navbar`를 가져온다.

### 9. Create src/components/ShoppingList.jsx

reactstrap: https://reactstrap.github.io/?path=/docs/components-listgroup--list-group

위의 링크로 가서 `component/ListGroup`를 가져온다.

server에 있는 data를 client에서 Get/Post/Delete하도록 간단히 만들어 준다.

### 10. Implementing Redux

client fodler에서 dependencies를 install한다.

> `cd client`

- `redux`:
- `react-redux`:
- `redux-thunk`:

> `npm i redux react-redux redux-thunk` > `npm i -D redux react-redux redux-thunk`

- client/src에 store.js 만들기
- App.js에 Provider 추가

## Reference

- Youtube Link: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=3&ab_channel=TraversyMedia
- Github Link: https://github.com/bradtraversy/mern_shopping_list
