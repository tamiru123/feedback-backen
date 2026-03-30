"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const crypto_1 = __importDefault(require("crypto"));
class RefreshToken extends sequelize_1.Model {
    static generateToken() {
        return crypto_1.default.randomBytes(40).toString('hex');
    }
    isExpired() {
        return new Date() > this.expiresAt;
    }
    revoke() {
        this.revokedAt = new Date();
    }
}
exports.RefreshToken = RefreshToken;
RefreshToken.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    expiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    revokedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    timestamps: true,
    indexes: [
        { fields: ['token'] },
        { fields: ['userId'] },
        { fields: ['expiresAt'] },
    ],
});
//# sourceMappingURL=RefreshToken.js.map