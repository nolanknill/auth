# Lecture: Client-Side Auth

## Usage
Start with client side code for logging in, storing the JWT, and then showing a hidden page containing the user posts.
Add server side code for login, creating the JWT, then verifying JWT on subsequent requests to endpoints requiring authorization

## Setup
Install and run client and server

`cd client`

`npm install && npm start`

`cd ../server`

`cp .env.example .env`

`npm install`

`npm run migrate && npm run seed`

`npm run dev`

## Authentication
You can login using the following accounts defined in /server/seeds/user_and_post_seeder.js usersData variable:


|Username|Password  |
|--|--|
| Nolan | password |
| Mike | password |
