[![Build Status](https://travis-ci.org/uchemukolo/myDiaryApp.svg?branch=develop)](https://travis-ci.org/uchemukolo/myDiaryApp)
[![Coverage Status](https://coveralls.io/repos/github/uchemukolo/myDiaryApp/badge.svg)](https://coveralls.io/github/uchemukolo/myDiaryApp)
[![Maintainability](https://api.codeclimate.com/v1/badges/89aeb1ba3545da4300f6/maintainability)](https://codeclimate.com/github/uchemukolo/myDiaryApp/maintainability)

# myDiaryApp
MyDiary is an online journal where users can pen down their thoughts and feelings.

# Development
The development is broken down into two parts, the server side and the client side. The server side (API/backend) is developed using Express, NodeJs and PostgreSQL for persisting data, Json Web token for authentication.

## API DOCUMENTATION

# API FEATURE
myDiary has the following features:

# Authentication
- It makes use of jsonwebtoken for authentication
- Users have to supply their token after login to access all route

# Users
- It allows users to register by supplying details like: username, password, and email
- Upon registration, a new user account will be created
- Registered users can access all the routes
- Authenticated users can view and update their profile
- Registered Users can reset their password if forgotten

# Entries
- Authenticated users can create an entry by supplying the title and details of the entry
- Authenticated users can also get all entries that belong to them and not other users entries
- Authenticated users can get a specific diary entry by supplying the entry Id
- Authenticated users can modify an entry for as long as the entry was created on the same day



## INSTALLATION
- Clone the repository locally on your desktop using ```git clone https://github.com/uchemukolo/myDiaryApp.git```
- Navigate from your terminal to myDiaryApp using ```cd myDiaryApp```
- Pull the development branch using ```git pull origin develop```
- Install the dependencies using ```npm install```
- Create a ```.env``` file at the root of the project following the guide in ```.env.example``` to setup your port
- You can view the app using ```localhost:PORT/```
- Run ```npm run test``` to run all endpoints test

You can also access [myDiaryApp](https://mydiary-challenge.herokuapp.com) api on heroku

# TESTING WITH POSTMAN
The API contains different endpoints with their respective payload in the table below

|Endpoints|Functions|Payloads|Requets Method|
|---------|---------|--------|--------------|
|/api/v1/auth/signup| Create a new user|username, password, email| POST|
|/api/v1/auth/login| Login a user|username, password| POST|
|/api/v1/auth/profile| Get a user profile by Id|No payload|GET|
|/api/v1/auth/profile/update| Update a user profile|firstName, lastName| PUT|
|/api/v1/auth/reminder| Subscribe for daily email reminder|name, email| POST|
|/api/v1/auth/password/resetLink| Update a user profile|email| POST|
|/api/v1/auth/password/change| Reset user password|password| PUT|
|/api/v1/entries| Get all entries for a user|No payload|GET|
|/api/v1/entries| Post a new user entry|title, mood, entry| POST|
|/api/v1/entries/:entryId| Get entry by Id|No payload| GET|
|/api/v1/entries/:entryId| Modify a pending request|title, details| PUT|
|/api/v1/entries/:entryId| delete an entry for a user|No payload| DELETE|



# TECHNOLOGIES USED
- [Node-js](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
- [Javascript-ES6](https://en.wikipedia.org/wiki/ECMAScript) The 6th edition of EcmaScript, officially known as ECMAScript 2015, was finalized in June 2015. This update adds significant new syntax for writing complex applications, including classes and modules, but defines them semantically in the same terms as ECMAScript 5 strict mode
- [Babel](https://babeljs.io/) used for transpiling codes from ES6 to ES5
- [Mocha](https://mochajs.org/) used for setting up tests
- [PostgreSQL](https://www.postgresql.org/) used for setting up relational database
- [Vanilla Js](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for frontend design
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) for frontend design
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) for styling frontend
- [FETCH API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for making Ajax call from the client to the API

The full API documentation can be Viewed [Here](https://mydiarychallenge.docs.apiary.io/)

# Coding style
- Airbnb is used for style guide

# Author
Uche Mukolo

