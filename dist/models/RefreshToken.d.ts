import { Model, Optional } from 'sequelize';
export interface RefreshTokenAttributes {
    id: number;
    token: string;
    userId: number;
    expiresAt: Date;
    revokedAt: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, 'id' | 'revokedAt'> {
}
export declare class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
    id: number;
    token: string;
    userId: number;
    expiresAt: Date;
    revokedAt: Date | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static generateToken(): string;
    isExpired(): boolean;
    revoke(): void;
}
//# sourceMappingURL=RefreshToken.d.ts.map