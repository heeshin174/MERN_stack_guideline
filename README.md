# MERN Shopping List

Learn the MERN Stack

M: MongoDB (Database)
E: Express Js (Server)
R: React Js (Frontend)
N: Node Js

## Used Technologies

- Node js [node.js](https://nodejs.org/en/)
- Postman [Postman](https://www.postman.com/downloads/)
- VSCode [VSCode](https://code.visualstudio.com/)
- github [github](https://github.com/)
- Heroku [Heroku](https://www.heroku.com/)
- mongoDB
- React js
- Express js

## Beginning from scratch

Workflow: 1. Server => 2. Database => 3. User authentication => 4. Frontend

## 1. Server: Express js

### 1. Initialize project

Open Terminal and type the following command:

```
> $ mkdir MERN_SHOPPING_LIST
> $ cd MERN_SHOPPING_LIST
> $ npm init
```

- description: Shopping List built with the MERN stack
- entry point (index.js) server.js
- type: "module"
- author: Heechul Shin
- license: (ISC) MIT

type을 module로 해야지만 file을 내보내고/가져올 때, `module.export/require`을 사용하는 CommonJS 대신
`import/export`의 형식을 지원하는 ES6 module을 사용할 수 있습니다.

### 2. Install Dependencies for Backend and Database:

- `express`: Backend framework:
- `mongoose`: mongodb framework
- `concurrently`: run more than one `npm` scripts at a time, so that we are able to run the server and the client at a same time.
- `nodemon`: constantly watch our backend and reload once we save (auto refresh).
- `dotenv`: set the environment variable so that hide all of our secret information.
- `colors`: get color and style

```
body-parser: POST 요청시 body 데이터값을 읽을 수 있는 구문으로 parsing해줍니다. Object => Json
💥 Express v4.16.0 기준으로 body parser가 built-in 되어 별도의 설치 없이 아래와 같이 이용 가능합니다!

const express = require('express');
const app = express();

// json 형태로 parsing
app.use(express.json());
app.use(express.urlencoded( {extended : false } ));

bodyparser middleware를 사용하지 않으면, post request를 헀을 때 res.body가 undefined이 된다.

app.post('/api/goals', (req, res) => {
    console.log(req.body); // undefined
})

// after add `app.use(express.json())`
console.log(req.body); // [Object: null prototype] { key: 'value' }
```

> `npm i express mongoose concurrently dotenv colors`

nodemon은 개발할 때만 사용할 dependency이기 때문에, -D를 붙혀 실제 production에서는 설치하지 않는다.

- `-D`: stands for development dependency because it's not needed for production.

> `npm i -D nodemon`

### 3. Basic Setting for Project

- Add `start`, `server` scripts in `package.json`

`package.json` file

```
"scripts": {
  "start": "node server.js",
  "server": "nodemon server.js"
},
```

- start: start the server. but need to restart the server after every server-side change.
- server (Dev only): start the server. nodemon continuously watch the server, and we won't have to keep updating it.

To use these command, type:

> `npm start`

run the command that is defined in "start" script. This is same as `node server.js`

> `npm run server`

- Create `.env`, `server.js`, `app.js`

`.env` file

```
NODE_ENV = development
PORT = 5000
```

`./server.js` file

```
import app from "./app.js";

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
```

`./app.js` file

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

- Add `.env`, `node_modules` and `package-lock.json` to `.gitignore`.

### 4. Routes file

When clients send http request to `/api/goals`, server need to response. We don't want `app.js` file handle all requests.

- Create `./routes/api/goalRoutes.js` folders and file to handle routing.

`./routes/api/goalRoutes.js` file

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

`./app.js` file

```
import goalRoutes from "./routes/api/goalRouters.js";

// use routes
app.use("/api/goals", goalRoutes);
```

now, run the server and open Postman and send http request to `localhost:5000/api/goals`

### 5. Controller

It is better to have a controller that contains all functions for `/api/goals`.

- Create `controllers/goalController.js` folder and file to handle http requests.

`./controllers/goalController.js` file

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

`./routes/goalRoutes.js` file

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

`./controller/goalController.js` file

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

위의 코드는 text가 없는 post request를 했을 경우, by default, express js error handler returns html page. We want to get the json file, so we will override default error message.

`./middleware/errorMiddleware.js` folder와 file 생성

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
- MongoDB URL (MongoDB Atlas): https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=1217adtest_pmcopy_control&utm_source=google&utm_campaign=gs_americas_united_states_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624338&adgroup=115749704063&gclid=Cj0KCQiAxc6PBhCEARIsAH8Hff0GkAMWkv-SOoaFSdMgxQaEshcIGIyDHAaSqp-B-yPgW03BbW9DxxQaAhi8EALw_wcB

```
Create Project => Create Database => Cluster Tier: M0 Sandbox (Free) => Cloud Provider: AWS
Set User name & User password => Network access IP Address

- Connect => "Connet your application" => DRIVER: Node.js => Get mongoDBURI
- Browse Collections => add Collections called "goals" (Collection is a table)
```

- `.env` file: add `MONGO_URI`

`MONGO_URI = mongodb+srv://Shin:<password>@cluster0.sjhvl.mongodb.net/<myfirstDatabase>?retryWrites=true&w=majority`

- Using this MongoDB URI, connect to the Database in `config/db.js`

- `./config/db.js`

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

## 3. JWT Authentication

JWT (Json Web Token)은 

1. Header
2. Payload
3. VERIFY SIGNATURE



## 4. Client: React

### 1. Create client folder

- create new folder 'client'

> `mkdir client; cd client`

inside the client folder, create new react app

> `npx create-react-app .`

create-react-app은 기존의 package.json과는 다른 새로운 package.json을 만들어 내는데, 이 package.json에 "proxy" value를 적어놓는 것이 중요하다. proxy는 개발할 때만 쓰이기 때문에 나중에는 신경쓰지 않아도 된다.

예를 들어 `axios.get('http://localhost:5000/api/items')`와 같은 긴 주소명을
`axios.get('api/items')`와 같이 짧게 쓰는 것을 가능하게 만들어 준다.

```
// package.json in client folder
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

우리는 두 개의 package.json이 있기 때문에 client folder에서 `npm start`를 입력하면 react가 실행되고,
MERN_SHOPPING_LIST folder에서 `npm start`를 입력하면 server.js가 실행된다.

우리는 이런 두 개의 command를 MERN_SHOPPING_LIST folder에서 동시에 사용하고 싶다.

이때, 우리가 설치한 dependency `concurrently`가 역할을 해준다.

- MERN_SHOPPING_LIST folder의 package.json에 "client": "cd client && npm start" 또는 "client": "npm start --prefix client"를 적는다.

  이는 사용자가 client folder를 들어가지 않고도 client folder의 react app을 실행시킨다.

Run the React client only

> `npm run client`

- MERN_SHOPPING_LIST folder의 package.json에 "client": "client-install": "npm install --prefix client" 또는 "client": "cd client && npm install"를 적는다.

  이는 사용자가 client folder를 들어가지 않고도 client folder의 dependencies를 install할 수 있게 해준다.

Install dependencies for client

> `npm run client-install`

server side의 dependencies를 설치하려면, MERN_SHOPPING_LIST folder에서 다음을 입력한다.

> `npm install`

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

### 7. Install dependencies for client

Go to the client folder and install dependencies.

> `cd client`

- `bootstrap`: frontend dev에 대한 구조를 미리 만들어둔 프레임워크입니다. 기본적인 css, js를 제공합니다.
- `reactstrap`: bootstrap component를 react component로 사용할 수 있게 만들어 준다.

`reactstrap`은 `material-ui`처럼 다른 프로그래머가 미리 만들어둔 react component를 가져다 쓸 수 있기 떄문에 매우 편하다.

이처럼 다른 사람이 만들어둔 source code를 찾아 copy & paste만 잘해도 된다.

- `uuid`: generate random ID
- `react-transition-group`: exposes simple components useful for defining entering and exiting transitions.

> `npm i bootstrap reactstrap uuid react-transition-group`

### 8. src folder에 component folder를 만들기

react js는 js 대신 jsx라는 다른 extension을 사용한다. 하지만 js를 사용해도 아무런 문제는 없다.

AppNavbar.js === AppNavbar.jsx

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

> `npm i redux react-redux redux-thunk`

- client/src에 store.js 만들기
- App.js에 Provider 추가

## Reference

- Youtube Link: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=3&ab_channel=TraversyMedia
- Github Link: https://github.com/bradtraversy/mern_shopping_list
- Express JS: https://expressjs.com/
- MongoDB docs: https://mongoosejs.com/docs/index.html
- Mongoose docs: https://mongoosejs.com/docs/
