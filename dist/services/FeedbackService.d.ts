import { CreateFeedbackRequest, UpdateFeedbackRequest, FeedbackStats } from '../types';
export declare class FeedbackService {
    private feedbackRepo;
    constructor();
    createFeedback(data: CreateFeedbackRequest & {
        ipAddress: string;
        userAgent: string;
        userId?: number;
    }): Promise<import("../models/Feedback").default>;
    getAllFeedbacks(limit?: number, offset?: number): Promise<import("../models/Feedback").default[]>;
    getFeedbackById(id: number): Promise<import("../models/Feedback").default>;
    updateFeedback(id: number, updateData: UpdateFeedbackRequest): Promise<import("../models/Feedback").default>;
    deleteFeedback(id: number): Promise<void>;
    getStats(): Promise<FeedbackStats>;
}
//# sourceMappingURL=FeedbackService.d.ts.map