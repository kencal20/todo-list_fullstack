require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors())


const db_name = process.env.DB_NAME
mongoose.connect(db_name)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error in Connecting to the db'))
db.once('open', () => console.log('Success in connecting to the db'))







app.use('/todolist', require('./routes/todoList'))





app.listen(port, () => console.log(`Your Server is hosted on http://localhost:${port}`))
