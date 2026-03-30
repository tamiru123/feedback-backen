import Feedback from '../models/Feedback';
export declare class FeedbackService {
    createFeedback(data: any): Promise<Feedback>;
    getAllFeedback(): Promise<Feedback[]>;
    getFeedbackById(id: number): Promise<Feedback | null>;
    getFeedbackStats(): Promise<{
        total: number;
        averageRating: number;
        recentFeedback: number;
        ratingDistribution: {
            rating: any;
            count: number;
        }[];
        wordRatingDistribution: {
            wordRating: any;
            count: number;
        }[];
        topicCounts: Record<string, number>;
        questionStats: any;
    }>;
    updateFeedback(id: number, data: any): Promise<Feedback>;
    deleteFeedback(id: number): Promise<boolean>;
}
//# sourceMappingURL=FeedbackService.d.ts.map