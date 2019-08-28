import UserModel from '../models/user'
import jwt from 'express-jwt'

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }
  return null
}

const authBase = {
  secret: process.env.AUTH_SECRET,
  userProperty: 'payload',
  getToken: getTokenFromHeaders
}

const userValidate = async (req, res, next) => {
  try {
    const countUsers = await UserModel.countDocuments({ email: req.payload.email })
    if (countUsers > 0) next()
    else res.status(401).json({})
  } catch (error) {
    next(error)
  }
}

const auth = {
  required: jwt(authBase),
  optional: jwt({
    ...authBase,
    credentialsRequired: false
  }),
  userValidate
}

module.exports = auth
