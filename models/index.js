const {sequelizeInstance} = require('../db/conn')
const {DataTypes} = require('sequelize')

const db = {}

db.User = require('./User_M')(sequelizeInstance,DataTypes)

db.sequelizeInstance = sequelizeInstance

module.exports = db