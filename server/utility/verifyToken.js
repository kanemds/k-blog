const jwt = require('jsonwebtoken')
const customError = require('./error')
require('dotenv').config()

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1]
  // const token = req.cookies.access_token

  if (!token) return next(customError(401, "User is not authenticated."))

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return next(customError(403, "Token is not valid!"))
    req.user = user

    next()
  })
}

module.exports = verifyToken