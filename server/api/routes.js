const router = require('express').Router()


// import files
const users = require('./users')
const auth = require('./auth')
const logout = require('./logout')



// routes
router.use('/users', users)
router.use('/auth', auth)
router.use('/logout', logout)

module.exports = router