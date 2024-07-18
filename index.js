require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const users = require('./routes/user.routes')
const posts = require('./routes/post.routes')
const likes = require('./routes/like.routes')
const comments = require('./routes/comment.routes')
const path = require('path')
const connectToMongoDB = require('./config/database.config')

connectToMongoDB()
  
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api', users)
app.use('/api/posts', posts)
app.use('/api/posts', likes)
app.use('/api/posts',comments)

const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening at  port ${port}`))
