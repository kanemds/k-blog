const Users = require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()

const register = async (req, res, next) => {
  try {

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new Users({ ...req.body, password: hash })
    await newUser.save()
    res.status(200).json('User has been created')
  } catch (error) {
    next(error)
  }
}

const logIn = async (req, res) => {
  try {
    const logInByUserName = Users.findOne({ userNeme: req.userName })
    const logInByEmail = Users.findOne({ email: req.email })
    if (!logInByEmail || !logInByUserName) {
      return
    }
  } catch (error) {

  }
}




module.exports = { register, logIn }