import { Model, Optional } from 'sequelize';
interface FeedbackAttributes {
    id: number;
    rating: number;
    wordRating: string;
    topics: string[];
    answers: any;
    ipAddress: string | null;
    userAgent: string | null;
    userId: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}
interface FeedbackCreationAttributes extends Optional<FeedbackAttributes, 'id' | 'ipAddress' | 'userAgent' | 'userId'> {
}
declare class Feedback extends Model<FeedbackAttributes, FeedbackCreationAttributes> implements FeedbackAttributes {
    id: number;
    rating: number;
    wordRating: string;
    topics: string[];
    answers: any;
    ipAddress: string | null;
    userAgent: string | null;
    userId: number | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default Feedback;
//# sourceMappingURL=Feedback.d.ts.map