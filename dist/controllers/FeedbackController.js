"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const FeedbackService_1 = require("../services/FeedbackService");
class FeedbackController {
    constructor() {
        // ✅ Create new feedback - only expects req and res
        this.create = async (req, res) => {
            try {
                const feedbackData = req.body; // Get data from req.body
                console.log('🎯 Controller received data:', feedbackData);
                // Validate required fields
                if (!feedbackData.rating || !feedbackData.wordRating || !feedbackData.topics) {
                    console.error('❌ Missing required fields:', {
                        hasRating: !!feedbackData.rating,
                        hasWordRating: !!feedbackData.wordRating,
                        hasTopics: !!feedbackData.topics
                    });
                    res.status(400).json({
                        success: false,
                        error: 'Missing required fields',
                        details: 'rating, wordRating, and topics are required'
                    });
                    return;
                }
                const feedback = await this.feedbackService.createFeedback(feedbackData);
                res.status(201).json({
                    success: true,
                    message: 'Feedback submitted successfully',
                    data: feedback
                });
            }
            catch (error) {
                console.error('❌ Controller error:', error);
                res.status(400).json({
                    success: false,
                    error: error.message || 'Failed to create feedback',
                    details: error.errors?.map((e) => e.message) || []
                });
            }
        };
        // Get all feedback (admin only)
        this.getAll = async (req, res) => {
            try {
                const feedbacks = await this.feedbackService.getAllFeedback();
                res.status(200).json({
                    success: true,
                    data: feedbacks
                });
            }
            catch (error) {
                console.error('❌ Error fetching feedbacks:', error);
                res.status(500).json({
                    success: false,
                    error: error.message || 'Failed to fetch feedbacks'
                });
            }
        };
        // Get feedback statistics
        this.getStats = async (req, res) => {
            try {
                const stats = await this.feedbackService.getFeedbackStats();
                res.status(200).json({
                    success: true,
                    data: stats
                });
            }
            catch (error) {
                console.error('❌ Error fetching stats:', error);
                res.status(500).json({
                    success: false,
                    error: error.message || 'Failed to fetch statistics'
                });
            }
        };
        // Get single feedback
        this.getOne = async (req, res) => {
            try {
                const { id } = req.params;
                const feedback = await this.feedbackService.getFeedbackById(Number(id));
                if (!feedback) {
                    res.status(404).json({
                        success: false,
                        error: 'Feedback not found'
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: feedback
                });
            }
            catch (error) {
                console.error('❌ Error fetching feedback:', error);
                res.status(500).json({
                    success: false,
                    error: error.message || 'Failed to fetch feedback'
                });
            }
        };
        // Update feedback
        this.update = async (req, res) => {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const feedback = await this.feedbackService.updateFeedback(Number(id), updateData);
                res.status(200).json({
                    success: true,
                    message: 'Feedback updated successfully',
                    data: feedback
                });
            }
            catch (error) {
                console.error('❌ Error updating feedback:', error);
                res.status(400).json({
                    success: false,
                    error: error.message || 'Failed to update feedback'
                });
            }
        };
        // Delete feedback
        this.delete = async (req, res) => {
            try {
                const { id } = req.params;
                await this.feedbackService.deleteFeedback(Number(id));
                res.status(200).json({
                    success: true,
                    message: 'Feedback deleted successfully'
                });
            }
            catch (error) {
                console.error('❌ Error deleting feedback:', error);
                res.status(400).json({
                    success: false,
                    error: error.message || 'Failed to delete feedback'
                });
            }
        };
        this.feedbackService = new FeedbackService_1.FeedbackService();
    }
}
exports.FeedbackController = FeedbackController;
exports.default = FeedbackController;
//# sourceMappingURL=FeedbackController.js.map