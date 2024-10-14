const Joi = require('joi');
const custom_V = require('./custom_V')


const register_V = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required(),
        password: Joi.string().required().custom(custom_V.password),
    })
}

const login_V = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}

const getUsers_V = {
    query: Joi.object().keys({
        page: Joi.string().optional(),   
        limit: Joi.string().optional(),
    })}

module.exports = {register_V, login_V,getUsers_V}
