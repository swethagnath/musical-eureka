const express = require('express')
const app = express()
const PORT = 5000

require('dotenv').config();

const cors = require('cors')
const students = require('./routes/students')


app.use(express.json())

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "Access-Token, Uid, x-auth");
  next();
});

app.use('/api', students)

app.listen(PORT, () => (
  console.log('server is running', PORT)
))  
