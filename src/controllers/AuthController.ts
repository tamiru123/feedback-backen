import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { LoginRequest, AuthRequest } from '../types';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
      
      const result = await this.authService.login(username, password, ipAddress);
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({
        success: false,
        error: (error as Error).message
      });
    }
  };

  getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      res.json({
        success: true,
        user: req.user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: (error as Error).message
      });
    }
  };
}