
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')

const customError = require('./customError')

const auth = (Roles)=> (req, res, next) =>{

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new customError("Authentication Invalid", StatusCodes.UNAUTHORIZED, "Authentication Error")
    }

    const token = authHeader.split(' ')[1]

    try{
       const payload = jwt.verify(token, process.env.AUTH_KEY)
       req.User = { email:payload.email, role:payload.role }

       if(!Roles.includes(payload.role)){
            throw new customError("Unauthorized for this Action", StatusCodes.UNAUTHORIZED, "Authorization Error")
       }
       next()
    }
    catch(e){
        throw new customError("Try logging in again", StatusCodes.UNAUTHORIZED, "Authentication Error")
    }
}

module.exports = auth