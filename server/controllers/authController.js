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

  const cookies = req.cookies


  const { userName, email } = req.body
  if (!userName && !email) return next(customError(404, "Not authenticated please try again."))



  let user

  if (userName || email) {
    if (userName) {
      user = await Users.findOne({ userName: userName }).exec()
    } else if (email) {
      user = await Users.findOne({ email: email }).exec()
    } else {
      return next(customError(401, "Not authenticated please try again."))
    }
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password)

  if (!isMatch) return next(customError(400, "Not authenticated please try again."))

  if (isMatch) {

    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
    const newRefreshToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30s' })

    let newRefreshTokenArray = !cookies?.jwt ? user.refreshTokens : user.refreshTokens.filter(token => token !== cookies.jwt)

    if (cookies?.jwt) {

      const refreshToken = cookies.jwt

      const currentToken = await Users.findOne({ refreshToken }).exec()

      if (!currentToken) {
        console.log('Token is not valided')
        newRefreshToken = []
      }

      res.clearCookie('jwt', { httpOnly: true })
    }
    user.refreshTokens = [...newRefreshTokenArray, newRefreshToken]

    const result = await user.save()


    const { password, ...rest } = user._doc

    res.cookie('jwt', newRefreshToken)

    res.json({ rest, accessToken })

  } else {
    res.status(401).json('Not authenticated.')
  }

  // res.cookie('jwt', accessToken, { httpOnly: true }).status(200).json({ rest, accessToken, refreshToken })


}



module.exports = { register, logIn }