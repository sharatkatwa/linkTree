import { body } from "express-validator";

// Validate incoming create link requests
// - `url` is required and must include protocol (http/https)
// - `title` is optional but when present should be a short human-friendly label
export const createLinkValidator = [
  body("url")
    .trim()
    .notEmpty()
    .withMessage("URL is required")
    .isURL({ require_protocol: true })
    .withMessage("Enter a valid URL including protocol (http/https)"),
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters if provided"),
];

export default createLinkValidator;
