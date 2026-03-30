import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface SectorAttributes {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SectorCreationAttributes extends Optional<SectorAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Sector extends Model<SectorAttributes, SectorCreationAttributes> implements SectorAttributes {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sector.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'sectors',
    timestamps: true
  }
);

export default Sector;