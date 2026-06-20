import e from 'express'
import { createLink, getLinks } from '../controllers/link.controller.js'

const router = e.Router()

router.post('/', createLink)
router.get('/', getLinks)


export default router