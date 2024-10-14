const express = require('express')
const router = express.Router()

const Auth = require('../middlewares/Authentication')

const validate = require('../middlewares/validate')

const {register, login, forgotPassword, getUsers} = require('../controllers/Auth_C')
const {register_V, login_V, getUsers_V} = require('../validators/Auth_V')

router.post('/register', validate(register_V), register)
router.post('/login', validate(login_V), login)
router.get('/getUsers', Auth(['SuperAdmin','Admin']), validate(getUsers_V), getUsers)

module.exports = router