const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')


const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

require('dotenv').config()

const PORT = process.env.PORT || 5000
// process.env.mongoURI

//connect to mongodb
mongoose.connect("mongodb://localhost/devs", {
  useUnifiedTopology: true,
  useNewUrlParser: true, useCreateIndex: true
}, (err) => {
  console.log('Connected', err ? false : true)
})

const app = express()

//Use Routes
app.use(logger('dev'));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(PORT, () => {
  console.log('App is started at port ' + PORT)
})