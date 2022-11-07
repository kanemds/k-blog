const jwt = require('jsonwebtoken')
const Users = require('../models/user')
require('dotenv').config()

const refreshToken = async (req, res) => {
  // check 
  const cookies = req.cookies
  console.log(req.user)

  if (!cookies.jwt) return res.status(401).json("You are not authenticated!")
  const tokenFromUser = cookies.jwt
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

  const foundUser = await Users.findOne({ tokenFromUser }).exec()

  if (!foundUser) {
    jwt.verify(
      tokenFromUser,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, user) => {
        console.log(user)
        if (error) return res.status(403).json("You are not authenticated!")
        const invalidedToken = await Users.findById(user.id).exec()
        invalidedToken.refreshTokens = []
        const result = await invalidedToken.save()
        console.log(result)
      }
    )
    return res.status(403).json("You are not authenticated!")
  }

  const newRefreshTokenArray = foundUser.refreshTokens.filter(token => token !== tokenFromUser)



  jwt.verify(tokenFromUser, process.env.REFRESH_TOKEN_SECRET,
    async (error, user) => {
      if (error) {
        foundUser.refreshTokens = [...newRefreshTokenArray]
        const result = await foundUser.save()
        console.log(result)
      }

      if (error || foundUser.id || user.id) return res.status(403).json("You are not authenticated!")

      const newAccessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
      const newRefreshToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15s' })

      foundUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken]

      const result = await foundUser.save()

      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

      res.status(200).json({
        newAccessToken
      })
    })
}

module.exports = refreshToken