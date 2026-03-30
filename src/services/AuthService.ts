import { UserRepository } from '../repositories/UserRepository';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { LoginResponse } from '../types';

export class AuthService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async login(username: string, password: string, ipAddress: string): Promise<LoginResponse> {
    const user = await this.userRepo.findByUsername(username);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    if (!user.isActive) {
      throw new Error('Account is disabled');
    }
    
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    
    await this.userRepo.updateLastLogin(user.id);
    
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
    );
    
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  }

  async verifyToken(token: string): Promise<{ id: number; username: string; role: string }> {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as any;
      return { id: decoded.id, username: decoded.username, role: decoded.role };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async createAdminIfNotExists(): Promise<void> {
    const admin = await this.userRepo.findByUsername(config.ADMIN_USERNAME);
    if (!admin) {
      await this.userRepo.create({
        username: config.ADMIN_USERNAME,
        email: config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD,
        role: 'admin',
        isActive: true
      });
      console.log('✅ Admin user created');
    }
  }
}