import Feedback from '../models/Feedback';
import { FeedbackAttributes, FeedbackStats } from '../types';
export declare class FeedbackRepository {
    create(feedbackData: Partial<FeedbackAttributes>): Promise<Feedback>;
    findAll(limit?: number, offset?: number): Promise<Feedback[]>;
    findById(id: number): Promise<Feedback | null>;
    update(id: number, updateData: Partial<FeedbackAttributes>): Promise<Feedback | null>;
    delete(id: number): Promise<boolean>;
    getStats(): Promise<FeedbackStats>;
}
//# sourceMappingURL=FeedbackRepository.d.ts.map