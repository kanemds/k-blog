const Users = require('../models/user')

const signup = async (req, res) => {
  try {
    const newUser = new Users(req.body)
    await newUser.save()
    res.status(200).json('User has been created')
  } catch (error) {
    console.log(error.message)
  }
}



module.exports = { signup }