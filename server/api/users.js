const router = require('express').Router()
const verifyToken = require('../utility/verifyToken')
const { deleteUser } = require('../controllers/usersController')

router.delete('/:id', verifyToken, deleteUser)
router.get('/', verifyToken, getAllUsers)

module.exports = router