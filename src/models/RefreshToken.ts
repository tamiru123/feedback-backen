import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import crypto from 'crypto';

export interface RefreshTokenAttributes {
  id: number;
  token: string;
  userId: number;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, 'id' | 'revokedAt'> {}

export class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
  public id!: number;
  public token!: string;
  public userId!: number;
  public expiresAt!: Date;
  public revokedAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static generateToken(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  public revoke(): void {
    this.revokedAt = new Date();
  }
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    timestamps: true,
    indexes: [
      { fields: ['token'] },
      { fields: ['userId'] },
      { fields: ['expiresAt'] },
    ],
  }
);