# README

## Tech Stacks
- Node js
- Express js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- MVC Pattern

## Description
This is a backend API for a blog. This API implement the Auth login, signup and logout. Some routes require the auth middleware and get protected. This API manage a MongoDB database and can handle any frontend app like React app.

## Environnement Variables
Add there variables in the .ENV file to make sur the app runs correctly :
- ```PORT```  : should be 4000
- ```MONGO_URI``` : your mongoDB URI connection. Example for local dev environnement "mongodb://127.0.0.1:27017/db_name"
- ```SECRET```: a secret string as you want but never change it once it's in use by JWT. Example : "mypreferedsecretsentence"

## Scripts
First, install globaly Nodemon on your computer by running :
```npm install -g nodemon```
Then, to run the project, use the following command : 
```npm run start```

## Config requirements
Before running the app, make sur these requirements are checked : 
- You should have Mongodb open running
- You should have Node.js
- You have installed globaly Nodemon on your computer
- You have configured correctly all environnement variables

## Other info
- Author : JiovannyCoder
- Duration : 2 days and half