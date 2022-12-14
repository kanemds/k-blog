const router = require('express').Router()
const { logIn, register } = require('../controllers/authController')
const refreshToken = require('../utility/refreshToken')

router.post('/register', register)
router.post('/signin', logIn)
router.post('/refresh/:id', refreshToken)



module.exports = router