"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Question extends sequelize_1.Model {
}
Question.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sectorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sectors',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('radio', 'checkbox', 'text', 'textarea', 'rating'),
        allowNull: false,
    },
    text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    options: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    required: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    order: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'questions',
    timestamps: true,
    indexes: [
        { fields: ['sectorId'] },
        { fields: ['isActive'] },
        { fields: ['order'] },
    ],
});
exports.default = Question;
//# sourceMappingURL=Question.js.map