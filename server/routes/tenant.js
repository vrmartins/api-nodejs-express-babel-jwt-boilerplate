import express from 'express'
import BaseJoi from '@hapi/joi'
import auth from '../middlewares/auth'
import validate from '../utils/joi/validate'
import TenantController from '../controllers/tenant'
import { notSpecialCharacter } from '../utils/joi/not-special-character'

const Joi = BaseJoi.extend(notSpecialCharacter)

const router = new express.Router()

const tenantSchema = Joi.object().keys({
  name: Joi.string().notSpecialCharacter().max(128).required()
})

/**
 * @typedef Tenant
 *
 * @property {string} id - Id
 * @property {string} name.required - Name
 */

/**
 * @typedef Tenant_Request
 *
 * @property {string} name.required - Name
 */

router.route('/')
/**
  * Get a list of tenants
  *
  * @route GET /tenant/
  * @group Tenant - Manage tenant
  * @returns {Array.<Tenant>} 200 - OK
  * @return  {Error} 204 - No content
  * @return  {Error} 401 - You are not authorized to view the resource
  * @return  {Error} 403 - Accessing the resource you were trying
  * to reach is forbidden
  * @return  {Error} 404 - The resource you were trying to reach is not found
  * @return  {Error} 500 - Unexpected error
  */
  .get(auth.required, TenantController.get)

/**
  * Create a new tenant
  *
  * @route POST /tenant/
  * @group Tenant - Manage tenant
  * @param {Tenant_Request.model} tenant.body - Insert tenant
  * @returns {Tenant.model} 201 - Created
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
  .post(validate({ body: tenantSchema }), TenantController.post)

// router.route('/:id')

/**
  * Get a tenant by ID
  *
  * @route GET /tenant/{_id}
  * @group Tenant - Manage tenant
  * @returns {Tenant.model} 200 - Ok
  * @return  {Error} 204 - No content
  * @return  {Error} 401 - You are not authorized to view the resource
  * @return  {Error} 403 - Accessing the resource you were
  * trying to reach is forbidden
  * @return  {Error} 404 - The resource you were trying to reach is not found
  * @return  {Error} 500 - Unexpected error
  */
// .get(auth.required, TenantController.getById)

/**
  * Update tenant by ID
  *
  * @route PUT /tenant/{_id}
  * @group Tenant - Manage tenant
  * @returns {Tenant.model} 200 - Ok
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
// .put(TenantController.put)

/**
  * Delete a tenant by ID
  *
  * @route DELETE /tenant/{_id}
  * @group Tenant - Manage tenant
  * @returns {string} 200 - Ok
  * @return  {Error} 401 - Unauthorized
  * @return  {Error} 403 - Forbidden
  * @return  {Error} 404 - Not Found
  * @return  {Error} 500 - Unexpected error
  */
// .delete(TenantController.deleteById)

export default router
