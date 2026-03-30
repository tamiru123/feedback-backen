import { RefreshToken } from '../models/RefreshToken';
import { Op } from 'sequelize';

export class RefreshTokenRepository {
  async create(userId: number, expiresInDays: number = 7): Promise<RefreshToken> {
    const token = RefreshToken.generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    return RefreshToken.create({
      token,
      userId,
      expiresAt,
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return RefreshToken.findOne({
      where: {
        token,
        revokedAt: null,
        expiresAt: { [Op.gt]: new Date() },
      },
    });
  }

  async revokeAllForUser(userId: number): Promise<void> {
    await RefreshToken.update(
      { revokedAt: new Date() },
      { where: { userId, revokedAt: null } }
    );
  }

  async revokeToken(token: string): Promise<void> {
    await RefreshToken.update(
      { revokedAt: new Date() },
      { where: { token } }
    );
  }

  async cleanupExpired(): Promise<number> {
    const result = await RefreshToken.destroy({
      where: {
        [Op.or]: [
          { expiresAt: { [Op.lt]: new Date() } },
          { revokedAt: { [Op.ne]: null } },
        ],
      },
    });
    return result;
  }
}