import { RefreshToken } from '../models/RefreshToken';
export declare class RefreshTokenRepository {
    create(userId: number, expiresInDays?: number): Promise<RefreshToken>;
    findByToken(token: string): Promise<RefreshToken | null>;
    revokeAllForUser(userId: number): Promise<void>;
    revokeToken(token: string): Promise<void>;
    cleanupExpired(): Promise<number>;
}
//# sourceMappingURL=RefreshTokenRepository.d.ts.map