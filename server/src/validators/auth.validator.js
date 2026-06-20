import { body } from "express-validator";

// Username regex from schema — disallow reserved words (case-insensitive)
const restrictedUsernameRegex =
  /^((?!admin|root|login|register|signup|home|links).)*$/i;

export const signupValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 2, max: 25 })
    .withMessage("Username must be between 2 and 25 characters")
    .matches(restrictedUsernameRegex)
    .withMessage("Username contains restricted words."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("bio")
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("min:20 and max: 200 charecters allowed"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];
