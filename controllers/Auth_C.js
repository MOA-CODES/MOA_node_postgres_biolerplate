const customError = require('../middlewares/customError')
const services = require('../services')

const register = async (req, res)=>{
    const {name, email, phone, password} = req.body
    const createObject = {name, email, phone, password}

    const {data, code, errormsg, errname, message} = await services.Auth_S.register_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname : "Register Error")

    res.status(200).json({message, status:code, data})
}

const login = async (req, res)=>{
    const {email, password} = req.body
    const createObject = {email, password}

    const {data, code, message, errormsg, errname} = await services.Auth_S.login_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname : "login Error")
    
    res.status(code).json({message, status:code, data})
}

const getUsers = async(req, res)=>{
    const {page, limit} = req.query
    const createObject = {page, limit}

    const {data, code, message, errormsg, errname} = await services.Auth_S.getUsers_S(createObject)

    if(errormsg) throw new customError(errormsg, code, errname ? errname : "getUsers Error")

    res.status(code).json({message, status:code, data})
}

const forgotPassword = async (req, res)=>{

}

module.exports = {register, login, getUsers, forgotPassword}