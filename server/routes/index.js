import express from 'express'
import userRoutes from './user'
import tenantRoutes from './tenant'
import personRoutes from './person'

const router = new express.Router()

router.use('/user', userRoutes)
router.use('/tenant', tenantRoutes)
router.use('/person', personRoutes)

export default router
