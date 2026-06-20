import e from 'express'
import { createLink, getLinks, removeLink } from '../controllers/link.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = e.Router()

router.post('/',authMiddleware, createLink)
router.get('/:username', getLinks)
router.delete("/:id",authMiddleware, removeLink)


export default router