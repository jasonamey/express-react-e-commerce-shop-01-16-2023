const CustomError = require('../errors')
const { isTokenValid } = require('../utils')
const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    
    throw new CustomError.UnauthenticatedError('Authenticaiton Invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
   
    const { name, userId, role } = await isTokenValid({ token })
    req.user = { name, userId, role }
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
  next()
}

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]  
  try { 
    const payload = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name }
    next()
   } catch(error) {
    throw new UnauthenticatedError('Authentication invalid')
   }

}


const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      )
    }
    next()
  }

}

module.exports = {
  auth,
  authenticateUser, 
  authorizePermissions
}
