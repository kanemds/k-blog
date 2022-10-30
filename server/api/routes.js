const router = require('express').Router()

// import files
const users = require('./users')



// routes
router.use('/users', users)

module.exports = router