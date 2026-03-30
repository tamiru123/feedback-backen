"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const FeedbackRepository_1 = require("../repositories/FeedbackRepository");
class FeedbackService {
    constructor() {
        this.feedbackRepo = new FeedbackRepository_1.FeedbackRepository();
    }
    async createFeedback(data) {
        const { rating, wordRating, topics, ipAddress, userAgent, userId } = data;
        if (!rating || !wordRating || !topics || topics.length === 0) {
            throw new Error('All fields are required');
        }
        return await this.feedbackRepo.create({
            rating,
            wordRating,
            topics,
            ipAddress,
            userAgent,
            userId: userId || null
        });
    }
    async getAllFeedbacks(limit = 100, offset = 0) {
        return await this.feedbackRepo.findAll(limit, offset);
    }
    async getFeedbackById(id) {
        const feedback = await this.feedbackRepo.findById(id);
        if (!feedback) {
            throw new Error('Feedback not found');
        }
        return feedback;
    }
    async updateFeedback(id, updateData) {
        const feedback = await this.feedbackRepo.update(id, updateData);
        if (!feedback) {
            throw new Error('Feedback not found');
        }
        return feedback;
    }
    async deleteFeedback(id) {
        const deleted = await this.feedbackRepo.delete(id);
        if (!deleted) {
            throw new Error('Feedback not found');
        }
    }
    async getStats() {
        return await this.feedbackRepo.getStats();
    }
}
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=FeedbackService.js.map