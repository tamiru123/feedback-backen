import { Request, Response, NextFunction } from 'express';
import { cache } from '../config/redis';

export const rateLimiter = (windowMs: number = 900000, max: number = 100) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const key = `rate:${req.ip}:${req.path}`;
    const current = await cache.increment(key, Math.floor(windowMs / 1000));
    
    if (current > max) {
      res.status(429).json({
        error: 'Too many requests, please try again later.',
        retryAfter: Math.ceil(windowMs / 1000),
      });
      return;
    }
    
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - current));
    next();
  };
};