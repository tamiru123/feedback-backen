import { Request, Response } from 'express';
import { LoginRequest } from '../types';
export declare class AuthController {
    private authService;
    constructor();
    login: (req: Request<{}, {}, LoginRequest>, res: Response) => Promise<void>;
    getMe: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map