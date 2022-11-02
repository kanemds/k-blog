const Users = require('../models/user')
const customError = require('../utility/error')

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      await Users.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted.")
    } catch (error) {
      next(error)
    }
  } else {
    return next(customError(403, "Not authenticated."))
  }

}


module.exports = { deleteUser }