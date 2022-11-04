const router = require('express').Router()
const { logIn, register } = require('../controllers/authController')
const refreshToken = require('../utility/refreshToken')

router.post('/register', register)
router.post('/login', logIn)
router.post('/refresh', refreshToken)


module.exports = router