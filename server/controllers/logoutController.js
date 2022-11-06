const User = require('../models/user')

const logout = async (req, res, next) => {
  const cookies = req.cookies

  console.log(cookies.jwt)

  if (!cookies?.jwt) return res.sendStatus(204)
  const refreshToken = cookies.jwt

  const user = await User.findOne({ refreshToken }).exec()

  console.log(user)
  if (!user) {
    res.clearCookie('jwt')
    res.sendStatus(204)
    return next()
  }

  user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken)
  const result = await user.save()
  console.log(result)

  res.clearCookie('jwt').sendStatus(204).json("User Logout")

}

module.exports = logout