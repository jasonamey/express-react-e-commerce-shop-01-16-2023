const User = require('../model/User')
const user = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse, createJWT } = require('../utils')

const register = async (req, res) => {
  const { email, password, name } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new BadRequestError('email alread exists')
  }
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ email, password, name, role })
  const tokenUser = createTokenUser(user)
  res.status(StatusCodes.CREATED).json({ user: tokenUser, id: user._id })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {

    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }
  const tokenUser = createTokenUser(user)
  const token = await createJWT({ payload: tokenUser })

  const { role, _id } = user

  res.status(StatusCodes.OK).json({ token, role, id: _id })
}

// const logout = async (req, res) => {
//   res.cookie('token', 'logout', {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000)
//   })
//   res.status(StatusCodes.OK).json({ msg: 'logout'})
// }

module.exports = { register, login }