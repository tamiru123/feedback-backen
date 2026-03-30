"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
const sequelize_1 = require("sequelize");
class FeedbackService {
    // Create new feedback
    async createFeedback(data) {
        try {
            console.log('📝 Creating feedback in service with data:', JSON.stringify(data, null, 2));
            console.log('📦 Answers being saved:', JSON.stringify(data.answers, null, 2));
            // Validate required fields
            if (!data.rating) {
                throw new Error('rating is required');
            }
            if (!data.wordRating) {
                throw new Error('wordRating is required');
            }
            if (!data.topics) {
                throw new Error('topics is required');
            }
            // ✅ FIX: Add answers to the create call
            const feedback = await Feedback_1.default.create({
                rating: data.rating,
                wordRating: data.wordRating,
                topics: data.topics,
                answers: data.answers || {}, // ✅ ADD THIS LINE
                ipAddress: data.ipAddress || null,
                userAgent: data.userAgent || null,
                userId: data.userId || null
            });
            console.log('✅ Feedback created successfully:', feedback.id);
            console.log('📦 Saved answers in DB:', JSON.stringify(feedback.answers, null, 2));
            return feedback;
        }
        catch (error) {
            console.error('❌ Create feedback error:', error);
            throw error;
        }
    }
    // Get all feedback
    async getAllFeedback() {
        try {
            const feedbacks = await Feedback_1.default.findAll({
                order: [['createdAt', 'DESC']]
            });
            return feedbacks;
        }
        catch (error) {
            console.error('❌ Get all feedback error:', error);
            throw error;
        }
    }
    // Get feedback by ID
    async getFeedbackById(id) {
        try {
            const feedback = await Feedback_1.default.findByPk(id);
            return feedback;
        }
        catch (error) {
            console.error('❌ Get feedback by ID error:', error);
            throw error;
        }
    }
    // Get feedback statistics
    async getFeedbackStats() {
        try {
            const total = await Feedback_1.default.count();
            // Calculate average rating
            const avgResult = await Feedback_1.default.findOne({
                attributes: [
                    [sequelize_1.Sequelize.fn('AVG', sequelize_1.Sequelize.col('rating')), 'averageRating']
                ],
                raw: true
            });
            const averageRating = avgResult ? parseFloat(avgResult.averageRating || 0).toFixed(2) : 0;
            // Get rating distribution
            const ratingDistribution = await Feedback_1.default.findAll({
                attributes: [
                    'rating',
                    [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.col('rating')), 'count']
                ],
                group: ['rating'],
                order: [['rating', 'ASC']],
                raw: true
            });
            // Get word rating distribution
            const wordRatingDistribution = await Feedback_1.default.findAll({
                attributes: [
                    'wordRating',
                    [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.col('wordRating')), 'count']
                ],
                group: ['wordRating'],
                order: [[sequelize_1.Sequelize.literal('count'), 'DESC']],
                raw: true
            });
            // ✅ Get topic counts from the topics JSON column
            let topicCounts = {};
            const allFeedbacks = await Feedback_1.default.findAll({
                attributes: ['topics'],
                raw: true
            });
            allFeedbacks.forEach((fb) => {
                if (fb.topics && Array.isArray(fb.topics)) {
                    fb.topics.forEach((topic) => {
                        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
                    });
                }
            });
            // ✅ Get question answer statistics from the answers JSON column
            let questionStats = {};
            const allAnswers = await Feedback_1.default.findAll({
                attributes: ['answers'],
                raw: true
            });
            allAnswers.forEach((fb) => {
                if (fb.answers && typeof fb.answers === 'object' && Object.keys(fb.answers).length > 0) {
                    Object.entries(fb.answers).forEach(([questionId, answer]) => {
                        if (!questionStats[questionId]) {
                            questionStats[questionId] = { answers: {}, total: 0 };
                        }
                        const answerStr = JSON.stringify(answer);
                        questionStats[questionId].answers[answerStr] = (questionStats[questionId].answers[answerStr] || 0) + 1;
                        questionStats[questionId].total++;
                    });
                }
            });
            // Get recent feedback (last 7 days)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const recentFeedback = await Feedback_1.default.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: sevenDaysAgo
                    }
                }
            });
            return {
                total,
                averageRating: parseFloat(averageRating),
                recentFeedback,
                ratingDistribution: ratingDistribution.map(item => ({
                    rating: item.rating,
                    count: parseInt(item.count)
                })),
                wordRatingDistribution: wordRatingDistribution.map(item => ({
                    wordRating: item.wordRating,
                    count: parseInt(item.count)
                })),
                topicCounts, // ✅ Added
                questionStats // ✅ Added
            };
        }
        catch (error) {
            console.error('❌ Get stats error:', error);
            throw error;
        }
    }
    // Update feedback
    async updateFeedback(id, data) {
        try {
            const feedback = await Feedback_1.default.findByPk(id);
            if (!feedback) {
                throw new Error('Feedback not found');
            }
            // If rating is updated, also update wordRating
            if (data.rating && !data.wordRating) {
                const wordRatingMap = {
                    1: 'Very Poor',
                    2: 'Poor',
                    3: 'Average',
                    4: 'Good',
                    5: 'Excellent'
                };
                data.wordRating = wordRatingMap[data.rating];
            }
            await feedback.update(data);
            return feedback;
        }
        catch (error) {
            console.error('❌ Update feedback error:', error);
            throw error;
        }
    }
    // Delete feedback
    async deleteFeedback(id) {
        try {
            const feedback = await Feedback_1.default.findByPk(id);
            if (!feedback) {
                throw new Error('Feedback not found');
            }
            await feedback.destroy();
            return true;
        }
        catch (error) {
            console.error('❌ Delete feedback error:', error);
            throw error;
        }
    }
}
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=FeedbackService.js.map