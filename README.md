# REST-API-TheVelops
REST-API in Nodejs as part of the theVelops entrance process

# Usage
Run npm install to install all the necessary libraries,
In a comand prompt go to the MongoDB folder and run the mongod command to set up the local server with MongoDB,
Then the script "npm start" to run the server,
Now it is possible to send 'GET, POST, PATCH and DELETE' requests in JSON format to the localhost:3000/users/ 
by sending a GET request for /users it will return an array of JSON with all the users in the database.
by sending a POST request for /users with a body of JSON format with the following information: {"email": "String" , "first_name": "String", “last_name: "String", "personal_phone": "String", "password": "String"} it will create a new user. 
by sending a POST request for /users/login with a body of JSON format with the following information: {"email": "String", "password": "String"} it will return a token for the user's Authorization process.
by sending a GET request for /users/:id i will return a specific user of the database. 
by sending a PUT request for /users/:id with a body of JSON format with the following information: {"email": "String" , "first_name": "String", “last_name: "String", "personal_phone": "String", "password": "String"} and a Authentication Headers containing a valid token, it will update a specific user of the database.
by sending a DELETE request for /users/:id with a Authentication Headers containing a valid token, it will update a specific user of the database.
