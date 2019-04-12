'use strict';

import express from 'express';
import UserController from '../controllers/user';

const router = new express.Router();

/**
 * @typedef User
 *
 * @property {string} name.required - Name
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
    .get(UserController.get)

/**
  * Create a new user
  *
  * @route POST /user/
  * @group User - Manage user
  * @returns {User.model} 201 - Created
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
    .post(UserController.post);

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
    .get(UserController.getById)

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
    .delete(UserController.deleteById);

export default router;
