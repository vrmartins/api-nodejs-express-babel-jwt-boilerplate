import express from 'express'
import BaseJoi from '@hapi/joi'
import auth from '../middlewares/auth'
import validate from '../utils/joi/validate'
import PersonController from '../controllers/person'
import { notSpecialCharacter } from '../utils/joi/not-special-character'

const Joi = BaseJoi.extend(notSpecialCharacter)

const router = new express.Router()

const personSchema = Joi.object().keys({
  firstName: Joi.string().notSpecialCharacter().max(64).required(),
  lastName: Joi.string().notSpecialCharacter().max(128).required(),
  nickName: Joi.string().notSpecialCharacter().max(32),
  isCustomer: Joi.boolean(),
  isSupplier: Joi.boolean(),
  isEmployee: Joi.boolean()
})

/**
 * @typedef Person
 *
 * @property {string} id - Id
 * @property {string} tenantId.required - Tenant Id
 * @property {string} firstName.required - First Name
 * @property {string} lastName.required - Last Name
 * @property {string} nickName.required - Nickname
 * @property {string} isCustomer.required - Is Customer?
 * @property {string} isSupplier.required - Is Supplier?
 * @property {string} isEmployee.required - Is Employee?
 * @property {customerData.model} customerData - Customer Data
 * @property {supplierData.model} supplierData - Supplier Data
 * @property {employeeData.model} employeeData - Employee Data
 * @property {Array<address>} addresses - Addresses
 */

/**
 * @typedef Person_Request
 *
 * @property {string} firstName.required - First Name
 * @property {string} lastName.required - Last Name
 * @property {string} nickName.required - Nickname
 * @property {string} isCustomer.required - Is Customer?
 * @property {string} isSupplier.required - Is Supplier?
 * @property {string} isEmployee.required - Is Employee?
 * @property {customerData.model} customerData - Customer Data
 * @property {supplierData.model} supplierData - Supplier Data
 * @property {employeeData.model} employeeData - Employee Data
 * @property {Array<address>} addresses - Addresses
 */

router.route('/')
/**
  * Get a list of persons
  *
  * @route GET /person/
  * @group Person - Manage person
  * @returns {Array.<Person>} 200 - OK
  * @return  {Error} 204 - No content
  * @return  {Error} 401 - You are not authorized to view the resource
  * @return  {Error} 403 - Accessing the resource you were trying
  * to reach is forbidden
  * @return  {Error} 404 - The resource you were trying to reach is not found
  * @return  {Error} 500 - Unexpected error
  */
  .get(auth.required, PersonController.get)

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
  .post(auth.required, validate({ body: personSchema }), PersonController.post)

// router.route('/:id')

/**
  * Get a person by ID
  *
  * @route GET /person/{_id}
  * @group Person - Manage person
  * @returns {Person.model} 200 - Ok
  * @return  {Error} 204 - No content
  * @return  {Error} 401 - You are not authorized to view the resource
  * @return  {Error} 403 - Accessing the resource you were
  * trying to reach is forbidden
  * @return  {Error} 404 - The resource you were trying to reach is not found
  * @return  {Error} 500 - Unexpected error
  */
// .get(auth.required, PersonController.getById)

/**
  * Update person by ID
  *
  * @route PUT /person/{_id}
  * @group Person - Manage person
  * @returns {Person.model} 200 - Ok
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
// .put(PersonController.put)

/**
  * Delete a person by ID
  *
  * @route DELETE /person/{_id}
  * @group Person - Manage person
  * @returns {string} 200 - Ok
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
// .delete(PersonController.deleteById)

export default router
