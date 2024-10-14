const {Sequelize} = require('sequelize');

const sequelizeInstance = new Sequelize(process.env.DB_URI)

const connectDB = async()=>{
    try{
        return await sequelizeInstance.authenticate().then(()=>console.log("Connected to DB"))
    }catch(e){
        console.log("Unable to connect to the database").then(()=>process.exit(1))
    }
}

module.exports = {connectDB, sequelizeInstance}