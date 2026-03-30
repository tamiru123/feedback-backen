import { LoginResponse } from '../types';
export declare class AuthService {
    private userRepo;
    constructor();
    login(username: string, password: string, ipAddress: string): Promise<LoginResponse>;
    verifyToken(token: string): Promise<{
        id: number;
        username: string;
        role: string;
    }>;
    createAdminIfNotExists(): Promise<void>;
}
//# sourceMappingURL=AuthService.d.ts.map