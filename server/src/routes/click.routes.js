import e from "express";
import {
    getMyClicks,
  getMyClicksPerDay,
  trackClick,
} from "../controllers/click.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = e.Router();

router.post("/:linkId", trackClick);
router.get("/",authMiddleware, getMyClicks);
router.get("/perDay",authMiddleware, getMyClicksPerDay);

export default router;
