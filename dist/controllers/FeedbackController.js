"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const FeedbackService_1 = require("../services/FeedbackService");
class FeedbackController {
    constructor() {
        this.create = async (req, res) => {
            try {
                const { rating, wordRating, topics } = req.body;
                const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
                const userAgent = req.headers['user-agent'] || 'unknown';
                const userId = req.user?.id;
                const feedback = await this.feedbackService.createFeedback({
                    rating,
                    wordRating,
                    topics,
                    ipAddress,
                    userAgent,
                    userId
                });
                res.status(201).json({
                    success: true,
                    data: feedback
                });
            }
            catch (error) {
                console.error('Create feedback error:', error);
                res.status(400).json({
                    success: false,
                    error: error.message
                });
            }
        };
        this.getAll = async (req, res) => {
            try {
                const limit = parseInt(req.query.limit) || 100;
                const offset = parseInt(req.query.offset) || 0;
                const feedbacks = await this.feedbackService.getAllFeedbacks(limit, offset);
                res.json({
                    success: true,
                    data: feedbacks,
                    pagination: { limit, offset, count: feedbacks.length }
                });
            }
            catch (error) {
                console.error('Get all feedbacks error:', error);
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        };
        this.getOne = async (req, res) => {
            try {
                const { id } = req.params;
                const feedback = await this.feedbackService.getFeedbackById(parseInt(id));
                res.json({
                    success: true,
                    data: feedback
                });
            }
            catch (error) {
                console.error('Get feedback error:', error);
                res.status(404).json({
                    success: false,
                    error: error.message
                });
            }
        };
        this.update = async (req, res) => {
            try {
                const { id } = req.params;
                const { rating, wordRating, topics } = req.body;
                const updateData = {};
                if (rating !== undefined)
                    updateData.rating = rating;
                if (wordRating !== undefined)
                    updateData.wordRating = wordRating;
                if (topics !== undefined)
                    updateData.topics = topics;
                const feedback = await this.feedbackService.updateFeedback(parseInt(id), updateData);
                res.json({
                    success: true,
                    data: feedback,
                    message: 'Feedback updated successfully'
                });
            }
            catch (error) {
                console.error('Update feedback error:', error);
                res.status(400).json({
                    success: false,
                    error: error.message
                });
            }
        };
        this.delete = async (req, res) => {
            try {
                const { id } = req.params;
                await this.feedbackService.deleteFeedback(parseInt(id));
                res.json({
                    success: true,
                    message: 'Feedback deleted successfully'
                });
            }
            catch (error) {
                console.error('Delete feedback error:', error);
                res.status(404).json({
                    success: false,
                    error: error.message
                });
            }
        };
        this.getStats = async (req, res) => {
            try {
                const stats = await this.feedbackService.getStats();
                res.json({
                    success: true,
                    data: stats
                });
            }
            catch (error) {
                console.error('Get stats error:', error);
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        };
        this.feedbackService = new FeedbackService_1.FeedbackService();
    }
}
exports.FeedbackController = FeedbackController;
//# sourceMappingURL=FeedbackController.js.map