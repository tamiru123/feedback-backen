import { Model, Optional } from 'sequelize';
interface QuestionAttributes {
    id: number;
    sectorId: number;
    type: string;
    text: string;
    options: string[] | null;
    required: boolean;
    order: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {
}
declare class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
    id: number;
    sectorId: number;
    type: string;
    text: string;
    options: string[] | null;
    required: boolean;
    order: number;
    isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default Question;
//# sourceMappingURL=Question.d.ts.map