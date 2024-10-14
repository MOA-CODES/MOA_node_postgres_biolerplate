const Joi = require('joi')
const pick = require('../utils/pick')
const customError = require('../middlewares/customError')
const {StatusCodes} = require('http-status-codes')

const validate = (schema)=> (req, res, next)=>{
    const validSchema = pick(schema, ['body','params','query'])
    const object = pick(req, Object.keys(validSchema))
    const {value, error} = Joi.compile(validSchema)
        .prefs({errors:{label:'key'}, abortEarly: false})
        .validate(object);

    if(error){
        const errorMessage = error.details.map((details)=> details.message).join(', ');
        return next(new customError(errorMessage, StatusCodes.BAD_REQUEST, "validate Error"))
    }
    Object.assign(req, value)
    return next()
}

module.exports = validate