const logout = require('../controllers/logoutController')
const router = require('express').Router()

router.post('/', logout)

module.exports = router