import express from 'express'
import userRoutes from './user'

const router = new express.Router()

router.use('/user', userRoutes)

export default router
