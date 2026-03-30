"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = __importDefault(require("../models/User"));
class UserRepository {
    async findById(id) {
        return await User_1.default.findByPk(id, {
            attributes: ['id', 'username', 'email', 'role', 'isActive', 'lastLoginAt', 'createdAt']
        });
    }
    async findByUsername(username) {
        return await User_1.default.findOne({ where: { username } });
    }
    async findByEmail(email) {
        return await User_1.default.findOne({ where: { email } });
    }
    async create(userData) {
        return await User_1.default.create(userData);
    }
    async update(id, updateData) {
        const user = await User_1.default.findByPk(id);
        if (!user)
            return null;
        return await user.update(updateData);
    }
    async delete(id) {
        const user = await User_1.default.findByPk(id);
        if (!user)
            return false;
        await user.destroy();
        return true;
    }
    async updateLastLogin(id) {
        await User_1.default.update({ lastLoginAt: new Date() }, { where: { id } });
    }
    async findAll(limit = 100, offset = 0) {
        return await User_1.default.findAll({
            limit,
            offset,
            attributes: ['id', 'username', 'email', 'role', 'isActive', 'lastLoginAt', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });
    }
    async getStats() {
        const total = await User_1.default.count();
        const admins = await User_1.default.count({ where: { role: 'admin' } });
        const active = await User_1.default.count({ where: { isActive: true } });
        return { total, admins, active };
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map