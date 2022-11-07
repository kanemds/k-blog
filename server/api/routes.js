const router = require('express').Router()


// import files
const users = require('./users')
const auth = require('./auth')
const logout = require('./logout')
const refreshToken = require('../utility/refreshToken')



// routes
router.use('/users', users)
router.use('/auth', auth)
router.use('/logout', logout)
router.use('/refresh', refreshToken)

module.exports = router