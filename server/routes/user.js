"use strict";

import express from "express";
// import logger from '../logger';
import UserController from "../controllers/user";

const router = express.Router();

/**
 * @typedef User
 *
 * @property {string} name.required - Name
 * @property {string} email.required - Email
 * @property {string} password.required - Password
 */

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     summary: Retorna informações de users
 *     parameters:
 *       - name: 'limit'
 *         description: 'Limite de registros a serem retornados'
 *         in: 'query'
 *         schema:
 *             type: 'number'
 *       - name: 'offset'
 *         description: 'Deslocamento de registros'
 *         in: 'query'
 *         schema:
 *             type: 'string'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         schema:
 *           type: array
 *           items: 
 *             $ref: '#/definitions/User'
 *       204:
 *         description: No Content
 *       401:
 *         description: You are not authorized to view the resource
 *       403:
 *         description: Accessing the resource you were trying to reach is forbidden
 *       404:
 *         description: The resource you were trying to reach is not found
 *   post:
 *     tags:
 *       - User
 *     summary: Cadastra informações de users
 *     parameters:
 *       - in: 'body'
 *         name: 'body'
 *         required: 'true'
 *         description: 'User'
 *         schema:
 *             $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *   put:
 *     tags:
 *       - User
 *     summary: Atualiza informações de users
 *     parameters:
 *       - in: 'body'
 *         name: 'body'
 *         required: 'true'
 *         description: 'User'
 *         schema:
 *             $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Retorna informações de user por ID
 *     parameters:
 *       - name: 'id'
 *         description: 'ID do user'
 *         in: 'path'
 *         required: 'true'
 *         schema:
 *             type: 'string'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         schema:
 *           $ref: '#/definitions/User'
 *       204:
 *         description: No Content
 *       401:
 *         description: You are not authorized to view the resource
 *       403:
 *         description: Accessing the resource you were trying to reach is forbidden
 *       404:
 *         description: The resource you were trying to reach is not found
 *   delete:
 *     tags:
 *       - User
 *     summary: Deleta informações de users por ID
 *     parameters:
 *       - name: 'id'
 *         description: 'ID do user'
 *         in: 'path'
 *         required: 'true'
 *         schema:
 *             type: 'string'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *       204:
 *         description: No Content
 *       401:
 *         description: You are not authorized to view the resource
 *       403:
 *         description: Accessing the resource you were trying to reach is forbidden
 *       404:
 *         description: The resource you were trying to reach is not found
 */

router.route("/")
  /**
  * Get a list of users
  *
  * @route GET /user/
  * @group User - Manage user
  * @returns {Array.<User>} 200 - OK
  * @return  {Error} 204 - No content
  * @return  {Error} 401 - You are not authorized to view the resource
  * @return  {Error} 403 - Accessing the resource you were trying to reach is forbidden
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

router.route("/:id")

  /**
  * Get a user by ID
  *
  * @route GET /user/{_id}
  * @group User - Manage user
  * @returns {User.model} 200 - Ok
  * @return  {Error} 204 - No content
  * @return  {Error} 401 - You are not authorized to view the resource
  * @return  {Error} 403 - Accessing the resource you were trying to reach is forbidden
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