"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authenticate = void 0;
const AuthService_1 = require("../services/AuthService");
const authService = new AuthService_1.AuthService();
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        const decoded = await authService.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
exports.authenticate = authenticate;
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        res.status(403).json({ error: 'Admin access required' });
        return;
    }
    next();
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=auth.js.map