// backend/src/controllers/FeedbackController.ts
import { Request, Response } from 'express';
import { FeedbackService } from '../services/FeedbackService';

export class FeedbackController {
  private feedbackService: FeedbackService;

  constructor() {
    this.feedbackService = new FeedbackService();
  }

  // ✅ Create new feedback - only expects req and res
  public create = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error: any) {
      console.error('❌ Controller error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to create feedback',
        details: error.errors?.map((e: any) => e.message) || []
      });
    }
  };

  // Get all feedback (admin only)
  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const feedbacks = await this.feedbackService.getAllFeedback();
      res.status(200).json({
        success: true,
        data: feedbacks
      });
    } catch (error: any) {
      console.error('❌ Error fetching feedbacks:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch feedbacks'
      });
    }
  };

  // Get feedback statistics
  public getStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await this.feedbackService.getFeedbackStats();
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error: any) {
      console.error('❌ Error fetching stats:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch statistics'
      });
    }
  };

  // Get single feedback
  public getOne = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error: any) {
      console.error('❌ Error fetching feedback:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch feedback'
      });
    }
  };

  // Update feedback
  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const feedback = await this.feedbackService.updateFeedback(Number(id), updateData);
      
      res.status(200).json({
        success: true,
        message: 'Feedback updated successfully',
        data: feedback
      });
    } catch (error: any) {
      console.error('❌ Error updating feedback:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to update feedback'
      });
    }
  };

  // Delete feedback
  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.feedbackService.deleteFeedback(Number(id));
      
      res.status(200).json({
        success: true,
        message: 'Feedback deleted successfully'
      });
    } catch (error: any) {
      console.error('❌ Error deleting feedback:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to delete feedback'
      });
    }
  };
}

export default FeedbackController;