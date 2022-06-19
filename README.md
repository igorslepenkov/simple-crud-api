# simple-crud-api

Simple CRUD API with Node JS by Igor Slepenkov

Installing:

1. Git clone this repository
2. Run npm intall
3. Run npm start:dev

Usage:
This launches server with database of users in database.json file.

1. PORT variable is set in .env file.
2. App working url - http://localhost:5000/api/users

3. To get all users you should send GET request to http://localhost:5000/api/users.
   Server responses with status code 200.

4. To get user from users you should send GET request to http://localhost:5000/api/users/USER_ID
   USER_ID should exist in database and be valid according to uuid v4 standart

5. To post user you should send POST request to http://localhost:5000/api/users with JSON body, that represents new user.
   User data should include username, age and hobbies fields otherwise server will respond with status code 400.

6. To update user info in database yoou should send PUT request to http://localhost:5000/api/users/USER_ID
   This request should include whole body of the existing user including id, username, age and hobbies fields otherwise server will respond with status code 400.

7. To delete user you should send send DELETE request to http://localhost:5000/api/users/USER_ID.
   USER_ID should exist in database and be valid according to uuid v4 standart

Technologies used: Node JS, Typescript
