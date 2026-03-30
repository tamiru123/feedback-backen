"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRepository = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
class FeedbackRepository {
    async create(feedbackData) {
        return await Feedback_1.default.create(feedbackData);
    }
    async findAll(limit = 100, offset = 0) {
        return await Feedback_1.default.findAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
    }
    async findById(id) {
        return await Feedback_1.default.findByPk(id);
    }
    async update(id, updateData) {
        const feedback = await Feedback_1.default.findByPk(id);
        if (!feedback)
            return null;
        return await feedback.update(updateData);
    }
    async delete(id) {
        const feedback = await Feedback_1.default.findByPk(id);
        if (!feedback)
            return false;
        await feedback.destroy();
        return true;
    }
    async getStats() {
        const feedbacks = await Feedback_1.default.findAll();
        const total = feedbacks.length;
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const wordRatingCounts = {};
        const topicCounts = {};
        feedbacks.forEach(fb => {
            ratingCounts[fb.rating]++;
            wordRatingCounts[fb.wordRating] = (wordRatingCounts[fb.wordRating] || 0) + 1;
            if (Array.isArray(fb.topics)) {
                fb.topics.forEach(topic => {
                    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
                });
            }
        });
        const averageRating = total > 0
            ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / total
            : 0;
        return {
            total,
            averageRating: parseFloat(averageRating.toFixed(2)),
            ratingCounts,
            wordRatingCounts,
            topicCounts
        };
    }
}
exports.FeedbackRepository = FeedbackRepository;
//# sourceMappingURL=FeedbackRepository.js.map