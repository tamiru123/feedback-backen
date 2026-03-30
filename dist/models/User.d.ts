import { Model, Optional } from 'sequelize';
import { UserAttributes } from '../types';
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'email' | 'isActive' | 'lastLoginAt'> {
}
declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    username: string;
    email: string | null;
    password: string;
    role: 'admin' | 'user';
    isActive: boolean;
    lastLoginAt: Date | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export default User;
//# sourceMappingURL=User.d.ts.map