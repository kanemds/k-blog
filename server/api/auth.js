const router = require('express').Router()
const { logIn, register } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', logIn)

module.exports = router