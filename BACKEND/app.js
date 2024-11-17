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


app.get('/',(req,res) => {
  return res.status(200).send("Backend server is up and running")
})
app.use('/',router);


// error handler
// app.use(notFound);
// app.use(errorHandlerMiddleware);

const port = 5000
const MONGO_URI = "mongodb+srv://parass:Paras_123@nodeexpressproject.axqx7rz.mongodb.net/DNS?retryWrites=true&w=majority"

const start = async () => {
  try {
    await connectDB(MONGO_URI)
    app.listen(port, console.log(`app is listening to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()