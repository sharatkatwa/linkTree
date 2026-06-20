import authRoutes from './auth.routes.js'
import linkRoutes from './link.routes.js'
import e from 'express'


const router = e.Router()

router.use('/auth', authRoutes)
router.use('/links',linkRoutes )

export default router