const express = require("express");
const http = require('http')
const fs = require('fs')
const path = require("path");

const app = express();
const server = http.createServer(app)

const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require('cors')

const { sessionMiddleWare } = require('./middlewares/session')
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// const postRoutes = require("./routes/post");

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet());
app.use(morgan("common"));
app.use(sessionMiddleWare)

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('open', () => console.log('Successfully connected to MongoDB'))
db.on('error', console.error.bind(console, 'Connection error: '))

app.get('/', (req,res) => res.status(200).json({message: `Welcome to Model Site`}))

app.use('/auth', authRoutes)
app.use('user', userRoutes)

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))