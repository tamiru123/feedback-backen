import { Request, Response } from 'express';
import { LoginRequest, AuthRequest } from '../types';
export declare class AuthController {
    private authService;
    constructor();
    login: (req: Request<{}, {}, LoginRequest>, res: Response) => Promise<void>;
    getMe: (req: AuthRequest, res: Response) => Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map