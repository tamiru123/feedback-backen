import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }
    
    res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: (err as any).path,
        message: err.msg
      }))
    });
  };
};

export const loginValidation = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

export const feedbackValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('wordRating').trim().notEmpty().withMessage('Word rating is required'),
  body('topics').isArray({ min: 1 }).withMessage('At least one topic is required')
];

export const updateFeedbackValidation = [
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('wordRating').optional().trim().notEmpty().withMessage('Word rating cannot be empty'),
  body('topics').optional().isArray().withMessage('Topics must be an array')
];