# MERN Shopping List

Learn the MERN Stack

M: MongoDB (Database)
E: Express (Backend)
R: React JS (Frontend)
N: Node JS

## Before start

Download following in your local (working) computer:

- **node.js** [node.js](https://nodejs.org/en/) (Javascript: Programming Language)
- **Postman** [Postman](https://www.postman.com/downloads/)
- **VSCode** [VSCode](https://code.visualstudio.com/) (IDE: Code editor)

Create an account for these services if you don't have one:

- **github** [github](https://github.com/) (version control and source code management functionality)
- **Heroku** [Heroku](https://www.heroku.com/) (Deploy website)
- **mongoDB** (Database)

  Postman: Great program to build an RESTful web services.
  REST: Representational State Transfer

  Below is a table summarizing recommended return values of the primary HTTP methods in combination with the resource URIs:

| HTTP Verb | CRUD   | Entire Collection (e.g. /customers) | Specific Item (e.g. /customers/{id})                                       |
| --------- | ------ | ----------------------------------- | -------------------------------------------------------------------------- |
| POST      | Create | 201 (Created)                       | 404 (Not Found), 409 (Conflict) if resource already exists..               |
| GET       | READ   | 200 (OK)                            | 404 (Not Found), if ID not found or invalid.                               |
| PUT/PATCH | UPDATE | 405 (Method Not Allowed)            | 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid. |
| DELETE    | DELETE | 405 (Method Not Allowed)            | 200 (OK). 404 (Not Found), if ID not found or invalid.                     |

## Beginning from scratch

First we will start with the server side and database.

### 1. Create empty folder and create `package.json`

Open Terminal (CMD in window) and type the following command:

> `mkdir MERN_SHOPPING_LIST ; cd MERN_SHOPPING_LIST`

이는 MERN_SHOPPING_LIST라는 새로운 folder를 만드는 command `mkdir MERN_SHOPPING_LIST` 와
그 folder로 이동하는 command `cd MERN_SHOPPING_LIST`가 동시에 실행됩니다.

> `npm init`

- description: Shopping List built with the MERN stack
- entry point (index.js) server.js
- type: "module"
- author: Heechul Shin
- license: (ISC) MIT

type을 module로 해야지만 file을 내보내고/가져올 때, module.export/require을 사용하는 CommonJS 대신
**import/export**의 형식을 지원하는 ES6을 사용할 수 있습니다.

### 2. Install Dependencies for Backend and Database:

- Backend (Server) framework: `express`
- Database: `mongoose`
- `body-parser`: handle data that comes in when a request is made to our server. i.g.) when we send a post request, we want to be able to get the name of that post from the request.

  ※ body-parser가 뭐인지? POST 요청시 body 데이터값을 읽을 수 있는 구문으로 파싱해줍니다. 자바로 치면 Object => Json 파싱 시키는 느낌입니다.

```
💥 Express v4.16.0 기준으로 body parser가 built-in 되었습니다.
따라서 별도의 설치 없이 아래와 같이 이용 가능합니다!

const express = require('express');
const app = express();

// json 형태로 parsing
app.use(express.json());
app.use(express.urlencoded( {extended : false } ));
```

- `concurrently`: run more than one `npm` scripts at a time, sos that we are able to run the server and the client at a same time.
- `nodemon`: constantly watch our backend and reload once we save (auto refresh).
- `-D`: stands for development dependency because it's not needed for production.
- `dotenv`: set the environment variable so that hide all of our secret information.

  > `npm i express mongoose concurrently dotenv`

  nodemon은 개발할 때만 사용할 dependency이기 때문에, -D를 붙혀 실제 production에서는 설치하지 않는다.

  > `npm i -D nodemon`

### 3. Add { "start", "server" } in `package.json` script & Create { app.js & server.js & .gitignore & .env } files

```
// package.json
"scripts": {
  "start": "node server.js",
  "server": "nodemon server.js"
},
```

- start: start the server. but need to restart the server after every server-side change.
- server: start the server. nodemon continuously watch the server, and we won't have to keep updating it.

server는 개발할 때만 사용할 command이다.

To use these command, type:

> `npm start`

run the command that is defined in "start" key.
This is same as `node server.js`

> `npm run server`

we put our database connection configuration in the .env file. So, we don't want .env to deploy.

- Add `.env` to .gitignore.
- Add `node_modules` and `package-lock.json` to .gitignore

create a folder called `config` and inside create a file called `index.js`

```
// ./config/index.js
import dotenv from "dotenv";

// allow to use configurations in .env file with `process.env.${name}`
// dotenv.config({ silent: process.env.NODE_ENV === "production" });
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI // MONGO_URI is environment variable and is defined in .env file
};
```

- In `app.js`, define our basic application.
- In `server.js`, it simply listen the connections on the specified host and port in app.js

### 4. Create Mongo DataBase in the cloud storage and Create Database schemas

We need a MongoDB URL to be able to connect to.

- Create Database = { Cluster Tier: M0 Sandbox (Free),
  Cloud Provider: AWS
  }

- Set User name & User password, Network access IP Address
- Connect => "Connet your application" => DRIVER: Node.js
- Get mongoDBURI

- MongoDB URL (MongoDB Atlas): https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=1217adtest_pmcopy_control&utm_source=google&utm_campaign=gs_americas_united_states_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624338&adgroup=115749704063&gclid=Cj0KCQiAxc6PBhCEARIsAH8Hff0GkAMWkv-SOoaFSdMgxQaEshcIGIyDHAaSqp-B-yPgW03BbW9DxxQaAhi8EALw_wcB

- Using this MongoDB URI, connect to the Database in app.js
- Define a database schemas in the seperate folder class models
- In models folder, define `Item.js` that returns Item table

### 5. Create routers

- create new folder 'routes' and inside create new folder 'api'.
- In api folder, create a file `items.js` and define rest api. (GET, POST, DELETE)
- We use Postman program to test our rest api.

now our basic server structure is done. we are going to work in the client side

### 6. Create client folder

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

## Helpful Links

- Youtube Link: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=3&ab_channel=TraversyMedia
- Github Link: https://github.com/bradtraversy/mern_shopping_list
- Express JS: https://expressjs.com/
- MongoDB URL: https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=1217adtest_pmcopy_control&utm_source=google&utm_campaign=gs_americas_united_states_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624338&adgroup=115749704063&gclid=Cj0KCQiAxc6PBhCEARIsAH8Hff0GkAMWkv-SOoaFSdMgxQaEshcIGIyDHAaSqp-B-yPgW03BbW9DxxQaAhi8EALw_wcB
- MongoDB docs: https://mongoosejs.com/docs/index.html
- Mongoose docs: https://mongoosejs.com/docs/
- uuid: https://www.npmjs.com/package/uuid
- react-transition-group: https://reactcommunity.org/react-transition-group/
- redux: https://redux.js.org/introduction/getting-started
- redux 설명글: https://hwan1001.tistory.com/38
