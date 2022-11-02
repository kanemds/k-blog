const Users = require('../models/user')
const bcrypt = require('bcrypt')
const customError = require('../utility/error')
const jwt = require('jsonwebtoken')
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

const logIn = async (req, res, next) => {

  try {
    let user
    if (req.body.userName || req.body.email) {
      if (req.body.userName) {
        user = await Users.findOne({ userName: req.body.userName })
      } else if (req.body.email) {
        user = await Users.findOne({ email: req.body.email })
      } else {
        return next(customError(404, "Not authenticated please try again."))
      }
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) return next(customError(400, "Not authenticated please try again."))

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET)

    const { password, ...rest } = user._doc

    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
  } catch (error) {
    next(error)
  }
}




module.exports = { register, logIn }