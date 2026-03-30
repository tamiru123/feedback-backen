"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../config/environment");
class AuthService {
    constructor() {
        this.userRepo = new UserRepository_1.UserRepository();
    }
    async login(username, password, ipAddress) {
        const user = await this.userRepo.findByUsername(username);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        if (!user.isActive) {
            throw new Error('Account is disabled');
        }
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            throw new Error('Invalid credentials');
        }
        await this.userRepo.updateLastLogin(user.id);
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, environment_1.config.JWT_SECRET, { expiresIn: environment_1.config.JWT_EXPIRES_IN });
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        };
    }
    async verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, environment_1.config.JWT_SECRET);
            return { id: decoded.id, username: decoded.username, role: decoded.role };
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
    async createAdminIfNotExists() {
        const admin = await this.userRepo.findByUsername(environment_1.config.ADMIN_USERNAME);
        if (!admin) {
            await this.userRepo.create({
                username: environment_1.config.ADMIN_USERNAME,
                email: environment_1.config.ADMIN_EMAIL,
                password: environment_1.config.ADMIN_PASSWORD,
                role: 'admin',
                isActive: true
            });
            console.log('✅ Admin user created');
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map