# Login-API

## Technologies used
- Express
- Mongoose
- bcrypt


## About the project
 This project is directly linked to my another project which is
 the client side, so if you need a ready to go client for
 testing this login go check it out: [Repository of the project](https://github.com/vitorsaa2k/Login-System).

## How it works and details

 It veryfies the inputs received by the user using rejex (which i dont know how it works lol)
 encrypts the password received by the user and save it in the data-base.
 This is a NoSQL server and designed to use mongoDB as data-base.  
   
it will either send a "FAILED" or "SUCCESS" status and with a message descripting what heppened
```javascript
 {
    status: "FAILED"
    message: "Wrong password"
 }
 ``` 

## How to setup the server

 You just need to substitute the "MONGODB_URI" in the .env file.
 ```javascript
 MONGODB_URI=your server ip or whatever
 ```  
 After that, you should be done to run nodemon.

```bash
npm run nodemon
```

