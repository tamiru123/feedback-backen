"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FeedbackController_1 = require("../controllers/FeedbackController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
const feedbackController = new FeedbackController_1.FeedbackController();
// Public route - submit feedback
router.post('/', (0, validation_1.validate)(validation_1.feedbackValidation), feedbackController.create);
// Admin only routes
router.get('/', auth_1.authenticate, auth_1.requireAdmin, feedbackController.getAll);
router.get('/stats', auth_1.authenticate, auth_1.requireAdmin, feedbackController.getStats);
router.get('/:id', auth_1.authenticate, auth_1.requireAdmin, feedbackController.getOne);
router.put('/:id', auth_1.authenticate, auth_1.requireAdmin, (0, validation_1.validate)(validation_1.updateFeedbackValidation), feedbackController.update);
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, feedbackController.delete);
exports.default = router;
//# sourceMappingURL=feedbackRoutes.js.map