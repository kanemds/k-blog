const User = require('../models/user')

const logout = async (req, res, next) => {
  const cookies = req.cookies

  console.log(cookies)


  if (!cookies?.jwt) return res.sendStatus(204)
  const refreshToken = cookies.jwt

  const user = await User.findOne({ refreshToken }).exec()


  if (!user) {
    res.clearCookie('jwt', { httpOnly: true }).status.json("Not authenticated please try again.")

    return next()
  }

  user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken)
  console.log(user)
  const result = await user.save()


  res.clearCookie('jwt', { httpOnly: true }).status(204).json("User Logout")

}

module.exports = logout