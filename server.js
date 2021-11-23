// Dependencies

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express();
const db = mongoose.connection

// Configure settings

require('dotenv').config();


// Port

const PORT = process.env.PORT || 3000

// Database

const MONGODB_URI = process.env.MONGODB_URI

// cConnect to Mongo

mongoose.connect(MONGODB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

db.on('error', function (err){
    console.log(err.message + ' is mongod not running?');
})
db.on('connected', function (){
    console.log('mongod connected: ', MONGODB_URI);
})
db.on('disconnected', function (){
    console.log('mongod disconnected');
})


// Middleware

app.use(express.static('public'));

// Populates req.body with parsed info, because

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

// Routes

app.get('/', function (req, res){
    res.send('Hello World!');
})

// Listener

app.listen(PORT, function (){
    console.log('express is listening on: ', PORT);
})