const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./routes/route')
app.use(cors())
app.use(express.json())

// const {notFound,errorHandlerMiddleware}=require("./middleware");

const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/',router);


// error handler
// app.use(notFound);
// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`app is listening to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()