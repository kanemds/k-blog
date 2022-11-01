const Users = require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()

const register = async (req, res) => {
  try {

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new Users({ ...req.body, password: hash })
    await newUser.save()
    res.status(200).json('User has been created')
  } catch (error) {
    console.log(error.message)
  }
}

const logIn = async (req, res) => {

}




module.exports = { register, logIn }