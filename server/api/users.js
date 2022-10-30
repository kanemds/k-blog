const Users = require('../models/user')
const router = require('express').Router()
const { newUser } = require('../controllers/usersController')

router.post('/new', newUser)

module.exports = router