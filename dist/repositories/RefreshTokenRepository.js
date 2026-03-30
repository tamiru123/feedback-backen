"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRepository = void 0;
const RefreshToken_1 = require("../models/RefreshToken");
const sequelize_1 = require("sequelize");
class RefreshTokenRepository {
    async create(userId, expiresInDays = 7) {
        const token = RefreshToken_1.RefreshToken.generateToken();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);
        return RefreshToken_1.RefreshToken.create({
            token,
            userId,
            expiresAt,
        });
    }
    async findByToken(token) {
        return RefreshToken_1.RefreshToken.findOne({
            where: {
                token,
                revokedAt: null,
                expiresAt: { [sequelize_1.Op.gt]: new Date() },
            },
        });
    }
    async revokeAllForUser(userId) {
        await RefreshToken_1.RefreshToken.update({ revokedAt: new Date() }, { where: { userId, revokedAt: null } });
    }
    async revokeToken(token) {
        await RefreshToken_1.RefreshToken.update({ revokedAt: new Date() }, { where: { token } });
    }
    async cleanupExpired() {
        const result = await RefreshToken_1.RefreshToken.destroy({
            where: {
                [sequelize_1.Op.or]: [
                    { expiresAt: { [sequelize_1.Op.lt]: new Date() } },
                    { revokedAt: { [sequelize_1.Op.ne]: null } },
                ],
            },
        });
        return result;
    }
}
exports.RefreshTokenRepository = RefreshTokenRepository;
//# sourceMappingURL=RefreshTokenRepository.js.map