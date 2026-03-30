"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    async comparePassword(candidatePassword) {
        return bcryptjs_1.default.compare(candidatePassword, this.password);
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: { len: [3, 50] }
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    lastLoginAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcryptjs_1.default.hash(user.password, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcryptjs_1.default.hash(user.password, 10);
            }
        }
    }
});
exports.default = User;
//# sourceMappingURL=User.js.map