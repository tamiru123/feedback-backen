"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
const authController = new AuthController_1.AuthController();
// Public routes
router.post('/login', (0, validation_1.validate)(validation_1.loginValidation), authController.login);
// Protected routes
router.get('/me', auth_1.authenticate, authController.getMe);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map