"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Feedback extends sequelize_1.Model {
}
Feedback.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
    },
    wordRating: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    topics: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    ipAddress: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true
    },
    userAgent: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' }
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'feedbacks',
    timestamps: true,
    indexes: [
        { fields: ['rating'] },
        { fields: ['wordRating'] },
        { fields: ['createdAt'] }
    ]
});
exports.default = Feedback;
//# sourceMappingURL=Feedback.js.map