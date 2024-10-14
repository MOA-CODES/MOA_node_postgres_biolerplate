const {StatusCodes} = require('http-status-codes')
const db = require('../models')

const register_S = async(data)=>{
    try{
        const check = await db.User.findOne({where:{email: data.email}})

        if (check){
            return {errormsg:"email already exist",code:422}
        }

        const user = await db.User.create(data)

        const token = await user.createJWT()

        return {data: {user,token}, code:StatusCodes.OK, message:"Register success"}
    }catch(e){
        return{error: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

const login_S = async(data)=>{
    try{
        const check = await db.User.findOne({where:{email:data.email}})

        if (!check){
            console.log("check1 error================================================")

            return {errormsg:"User doesn't exist",code:StatusCodes.NOT_FOUND}
        }

       const check2 = await check.comparePSW(data.password)

       if(!check2){
        console.log("check2 error================================================")

        return {errormsg:"Invalid Credentials", code: StatusCodes.BAD_REQUEST}
       }

       const token = await check.createJWT()

       return {data:{user:check,token}, code:StatusCodes.OK, message:"Login success"}
    }catch(e){
        console.log("catch error================================================")

        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

const getUsers_S = async(data)=>{
    try{
        const page = Number(data.page) || 1
        const limit = Number(data.limit) || 10
        const offset = (page - 1) * limit //offset or skip

        const users = await db.User.findAll({limit, offset})

        return {message:"Users retrieved", data:users, code: StatusCodes.OK}

    }catch(e){
        console.log("catch error================================================")

        return {errormsg: e.message, code: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}

module.exports = {register_S, login_S, getUsers_S}