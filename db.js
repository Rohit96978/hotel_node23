const mongoose = require("mongoose");

// define mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'     // we can replace "hotels" with any other name

// setup mongoDB connection
mongoose.connect(mongoURL)

//  mongoose maintains a default connections object repersenting the MOnogoDB connnection.
const db = mongoose.connection;

//  we define a event listeners for database connections
db.on('connected',()=>{
    console.log('connect to MongoDB server');
})

db.on('error',(err)=>{
    console.error('MongoDB server got an error ', err);
})

db.on('disconnected',()=>{
    console.log('MongoDB server is disconnected');
})

//  commit add for testing perpose
module.exports = db;