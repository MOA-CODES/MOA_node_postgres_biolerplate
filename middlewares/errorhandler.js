const {StatusCodes} = require('http-status-codes')
const errorHandler = (err, req, res, next) =>{

    let customError = {
        msg: err.message || 'something went wrong try again later',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        name: err.name || 'error'
    }

    if(err.code === 11000){
        let key, value;
        for(key in err.KeyValue){
            value = err.keyValue[key]
        }
        customError.msg = `${key} : ${value} already exists`
        customError.name = 'Duplicate key error'
    }

    if(err.details){
        const property = err.details[0].path//the property or properties that are not needed or specified in the joi validation schema

        customError.msg = err.details[0].message
        customError.name = 'Validation error'
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    console.log(err)

    return res.status(customError.statusCode).send({error:{name:customError.name, msg:customError.msg}})
}

module.exports = errorHandler