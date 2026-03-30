import { Request, Response, NextFunction } from 'express';
export declare const rateLimiter: (windowMs?: number, max?: number) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=rateLimiter.d.ts.map