"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeedbackValidation = exports.feedbackValidation = exports.loginValidation = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            next();
            return;
        }
        res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    };
};
exports.validate = validate;
exports.loginValidation = [
    (0, express_validator_1.body)('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];
exports.feedbackValidation = [
    (0, express_validator_1.body)('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    (0, express_validator_1.body)('wordRating').trim().notEmpty().withMessage('Word rating is required'),
    (0, express_validator_1.body)('topics').isArray({ min: 1 }).withMessage('At least one topic is required')
];
exports.updateFeedbackValidation = [
    (0, express_validator_1.body)('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    (0, express_validator_1.body)('wordRating').optional().trim().notEmpty().withMessage('Word rating cannot be empty'),
    (0, express_validator_1.body)('topics').optional().isArray().withMessage('Topics must be an array')
];
//# sourceMappingURL=validation.js.map