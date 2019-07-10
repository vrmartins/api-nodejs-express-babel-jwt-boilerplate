import express from 'express'
import userRoutes from './user'
import tenantRoutes from './tenant'

const router = new express.Router()

router.use('/user', userRoutes)
router.use('/tenant', tenantRoutes)

export default router
