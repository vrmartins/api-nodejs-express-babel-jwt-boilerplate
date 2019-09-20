import express from 'express'
import authRoutes from './auth'
import userRoutes from './user'
import tenantRoutes from './tenant'
import personRoutes from './person'

const router = new express.Router()

router.use('/authenticate', authRoutes)
router.use('/user', userRoutes)
router.use('/tenant', tenantRoutes)
router.use('/person', personRoutes)

export default router
