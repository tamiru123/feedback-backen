import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface QuestionAttributes {
  id: number;
  sectorId: number;
  type: string;
  text: string;
  options: string[] | null;
  required: boolean;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  public id!: number;
  public sectorId!: number;
  public type!: string;
  public text!: string;
  public options!: string[] | null;
  public required!: boolean;
  public order!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sectors',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM('radio', 'checkbox', 'text', 'textarea', 'rating'),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'questions',
    timestamps: true,
    indexes: [
      { fields: ['sectorId'] },
      { fields: ['isActive'] },
      { fields: ['order'] },
    ],
  }
);

export default Question;