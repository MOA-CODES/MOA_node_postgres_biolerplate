require('dotenv').config()
require('express-async-errors')

const {connectDB}=require('./db/conn')

const db = require('./models')

const middlewares = require('./middlewares')

const routes = require('./routes')

const seedSuperAdmin = require('./utils/seedSuperAdmin')

const express = require('express')

const morgan = require('morgan')

const PORT = process.env.PORT

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res)=>{
    res.json('MOA NODE.JS POSTGRES BIOLERPLATE')
})

app.use('/api/v1/auth', routes.Auth_R)

app.use(middlewares.errorhandler)
app.use(middlewares.notfound)

connectDB()

db.sequelizeInstance.sync()
    .then(()=>{
        return seedSuperAdmin()
    })

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})