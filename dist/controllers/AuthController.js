"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    constructor() {
        this.login = async (req, res) => {
            try {
                const { username, password } = req.body;
                const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
                const result = await this.authService.login(username, password, ipAddress);
                res.json({
                    success: true,
                    ...result
                });
            }
            catch (error) {
                console.error('Login error:', error);
                res.status(401).json({
                    success: false,
                    error: error.message
                });
            }
        };
        this.getMe = async (req, res) => {
            try {
                res.json({
                    success: true,
                    user: req.user
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        };
        this.authService = new AuthService_1.AuthService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map