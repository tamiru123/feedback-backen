import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface FeedbackAttributes {
  id: number;
  rating: number;
  wordRating: string;
  topics: string[];
  answers: any; // Add this
  ipAddress: string | null;
  userAgent: string | null;
  userId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FeedbackCreationAttributes extends Optional<FeedbackAttributes, 'id' | 'ipAddress' | 'userAgent' | 'userId'> {}

class Feedback extends Model<FeedbackAttributes, FeedbackCreationAttributes> implements FeedbackAttributes {
  public id!: number;
  public rating!: number;
  public wordRating!: string;
  public topics!: string[];
  public answers!: any; // Add this
  public ipAddress!: string | null;
  public userAgent!: string | null;
  public userId!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
    wordRating: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    topics: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    answers: {  // Add this
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' }
    }
  },
  {
    sequelize,
    tableName: 'feedbacks',
    timestamps: true,
    indexes: [
      { fields: ['rating'] },
      { fields: ['wordRating'] },
      { fields: ['createdAt'] }
    ]
  }
);

export default Feedback;