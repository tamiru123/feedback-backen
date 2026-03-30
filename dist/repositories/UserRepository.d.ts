import User from '../models/User';
import { UserAttributes } from '../types';
export declare class UserRepository {
    findById(id: number): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userData: Partial<UserAttributes>): Promise<User>;
    update(id: number, updateData: Partial<UserAttributes>): Promise<User | null>;
    delete(id: number): Promise<boolean>;
    updateLastLogin(id: number): Promise<void>;
    findAll(limit?: number, offset?: number): Promise<User[]>;
    getStats(): Promise<{
        total: number;
        admins: number;
        active: number;
    }>;
}
//# sourceMappingURL=UserRepository.d.ts.map