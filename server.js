const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


const PORT = process.env.PORT || 5000

//DB config
const db = require('./config/keys').mongoURI;


//connect to mongodb
mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true, useCreateIndex: true
}, (err) => {
  console.log('Connected', err ? false : true)

})

const app = express()

app.get('/', (req, res) => {
  res.send('Hello')
})

//Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(PORT, () => {
  console.log('App is started at port ' + PORT)
})