const router = require('express').Router()


// import files
const users = require('./users')
const auth = require('./auth')



// routes
router.use('/users', users)
router.use('/auth', auth)

module.exports = router