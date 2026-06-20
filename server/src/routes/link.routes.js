import e from 'express'
import { createLink, getLinks, removeLink } from '../controllers/link.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import createLinkValidator from '../validators/link.validator.js'
import validate from '../middlewares/validate.middleware.js'

const router = e.Router()

// Apply validation for create link requests before controller
router.post('/', authMiddleware, createLinkValidator, validate, createLink)
router.get('/:username', getLinks)
router.delete("/:id",authMiddleware, removeLink)


export default router