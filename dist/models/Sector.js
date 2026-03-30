"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Sector extends sequelize_1.Model {
}
Sector.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'sectors',
    timestamps: true
});
exports.default = Sector;
//# sourceMappingURL=Sector.js.map