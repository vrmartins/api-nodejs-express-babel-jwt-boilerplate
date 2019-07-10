import express from 'express'
import Joi from '@hapi/joi'
import auth from './auth'
import User from '../models/user'
import UserController from '../controllers/user'
import validate from '../utils/joi/validate'

const router = new express.Router()

const userSchema = Joi.object().keys({
  firstName: Joi.string().max(64).required(),
  lastName: Joi.string().max(128).required(),
  email: Joi.string().email().required(),
  password: Joi.string().max(32).required()
})

/**
 * @typedef User
 *
 * @property {string} id - Id
 * @property {string} firstName.required - First Name
 * @property {string} lastName.required - Last Name
 * @property {string} email.required - Email
 * @property {string} hash.required - Hash
 * @property {string} salt.required - Salt
 * @property {Array<Tenant>} tenants.required - Tenants that the user can access
 * @property {string} role.required - User role
 */

/**
 * @typedef User_Request
 *
 * @property {string} id - Id
 * @property {string} firstName.required - First Name
 * @property {string} lastName.required - Last Name
 * @property {string} email.required - Email
 * @property {string} password.required - Password
 */

router.route('/')
/**
  * Get a list of users
  *
  * @route GET /user/
  * @group User - Manage user
  * @returns {Array.<User>} 200 - OK
  * @return  {Error} 204 - No content
  * @return  {Error} 401 - You are not authorized to view the resource
  * @return  {Error} 403 - Accessing the resource you were trying
  * to reach is forbidden
  * @return  {Error} 404 - The resource you were trying to reach is not found
  * @return  {Error} 500 - Unexpected error
  */
  .get(auth.required, UserController.get)

/**
  * Create a new user
  *
  * @route POST /user/
  * @group User - Manage user
  * @param {User_Request.model} user.body - Insert user
  * @returns {User.model} 201 - Created
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
  .post(validate({ body: userSchema }), (req, res, next) => {
    // TODO: Transferir a função para o controller
    const user = req.body

    if (!user.email) {
      return res.status(422).json({
        errors: {
          email: 'is required'
        }
      })
    }

    if (!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required'
        }
      })
    }

    const finalUser = new User(user)

    finalUser.setPassword(user.password)

    return finalUser.save()
      .then((doc) => {
        res.json({ user: finalUser.toAuthJSON() })
      })
      .catch((error) => {
        next(error)
      })
  })

router.route('/:id')

/**
  * Get a user by ID
  *
  * @route GET /user/{_id}
  * @group User - Manage user
  * @returns {User.model} 200 - Ok
  * @return  {Error} 204 - No content
  * @return  {Error} 401 - You are not authorized to view the resource
  * @return  {Error} 403 - Accessing the resource you were
  * trying to reach is forbidden
  * @return  {Error} 404 - The resource you were trying to reach is not found
  * @return  {Error} 500 - Unexpected error
  */
  .get(auth.required, UserController.getById)

/**
  * Update user by ID
  *
  * @route PUT /user/{_id}
  * @group User - Manage user
  * @returns {User.model} 200 - Ok
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
  .put(UserController.put)

/**
  * Delete a user by ID
  *
  * @route DELETE /user/{_id}
  * @group User - Manage user
  * @returns {string} 200 - Ok
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
  .delete(UserController.deleteById)

export default router
