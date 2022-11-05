const jwt = require('jsonwebtoken')
const Users = require('../models/user')
require('dotenv').config()

const refreshToken = async (req, res) => {

  const { access_token } = req.cookies

  const user = Users.findById(req.params.id)

  // token from axios post 
  const currentRefreshToken = req.body.token

  if (!refreshToken) return res.status(401).json("You are not authenticated!")


  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json("Refresh token is not valid!")

    const newAccessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
    const newRefreshToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30s' })

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })
  })
}

module.exports = refreshToken