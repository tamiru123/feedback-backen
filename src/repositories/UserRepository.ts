import User from '../models/User';
import { UserAttributes } from '../types';
import { Op } from 'sequelize';

export class UserRepository {
  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id, {
      attributes: ['id', 'username', 'email', 'role', 'isActive', 'lastLoginAt', 'createdAt']
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await User.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async create(userData: Partial<UserAttributes>): Promise<User> {
    return await User.create(userData as any);
  }

  async update(id: number, updateData: Partial<UserAttributes>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(updateData);
  }

  async delete(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }

  async updateLastLogin(id: number): Promise<void> {
    await User.update({ lastLoginAt: new Date() }, { where: { id } });
  }

  async findAll(limit: number = 100, offset: number = 0): Promise<User[]> {
    return await User.findAll({
      limit,
      offset,
      attributes: ['id', 'username', 'email', 'role', 'isActive', 'lastLoginAt', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
  }

  async getStats(): Promise<{ total: number; admins: number; active: number }> {
    const total = await User.count();
    const admins = await User.count({ where: { role: 'admin' } });
    const active = await User.count({ where: { isActive: true } });
    return { total, admins, active };
  }
}