import express from 'express'
import AuthController from '../controllers/auth'

const router = new express.Router()

router.route('/')
/**
  * Create a new person
  *
  * @route POST /person/
  * @group Person - Manage person
  * @param {Person_Request.model} person.body - Insert person
  * @returns {Person.model} 201 - Created
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
  .post(AuthController.authenticate)

export default router
