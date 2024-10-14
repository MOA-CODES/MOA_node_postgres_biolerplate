const {sequelizeInstance} = require('../db/conn')
const {DataTypes} = require('sequelize')

const db = {}

db.User = require('./User_M')(sequelizeInstance,DataTypes) //Add every model in this format to db to make accessible 

db.sequelizeInstance = sequelizeInstance

module.exports = db