import { Model, Optional } from 'sequelize';
interface SectorAttributes {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
interface SectorCreationAttributes extends Optional<SectorAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}
declare class Sector extends Model<SectorAttributes, SectorCreationAttributes> implements SectorAttributes {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default Sector;
//# sourceMappingURL=Sector.d.ts.map