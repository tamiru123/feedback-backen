// backend/src/routes/feedbackRoutes.ts
import { Router, Request, Response } from 'express';
import FeedbackController from '../controllers/FeedbackController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const feedbackController = new FeedbackController();

// Helper function to convert numeric rating to word rating
const getWordRating = (rating: number): string => {
  switch (rating) {
    case 1: return 'Very Poor';
    case 2: return 'Poor';
    case 3: return 'Average';
    case 4: return 'Good';
    case 5: return 'Excellent';
    default: return 'Average';
  }
};

// Public route - submit feedback
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('='.repeat(50));
    console.log('📥 FEEDBACK SUBMISSION RECEIVED');
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
    console.log('='.repeat(50));
    
    // Extract data
    const { rating, topics, sectorId, answers, comments } = req.body;
    
    // Validate required fields
    const errors: string[] = [];
    
    if (rating === undefined || rating === null) {
      errors.push('rating is required');
    } else if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      errors.push('rating must be a number between 1 and 5');
    }
    
    if (!topics) {
      errors.push('topics is required');
    } else if (!Array.isArray(topics)) {
      errors.push('topics must be an array');
    } else if (topics.length === 0) {
      errors.push('topics must have at least one topic');
    }
    
    // If validation fails, return detailed error
    if (errors.length > 0) {
      console.log('❌ Validation failed:', errors);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors,
        receivedData: req.body
      });
    }
    
    // Get IP address and user agent from request
    const ipAddress = req.ip || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;
    
    // Convert numeric rating to word rating
    const wordRating = getWordRating(Number(rating));
    
    // Create complete feedback data object
    const feedbackData = {
      rating: Number(rating),
      wordRating: wordRating,
      topics: topics,
      answers: answers || {},
      ipAddress: ipAddress,
      userAgent: userAgent,
      userId: null,
      sectorId: sectorId || null,
      comments: comments || null
    };
    
    console.log('✅ Validation passed. Creating feedback:', feedbackData);
    
    // ✅ FIX: Pass only req and res, modify req.body before calling
    req.body = feedbackData;
    await feedbackController.create(req, res); // Only pass 2 arguments
    
  } catch (error: any) {
    console.error('❌ Route error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error?.message || 'Unknown error'
    });
  }
});

// Admin only routes
router.get('/', authenticate, requireAdmin, feedbackController.getAll);
router.get('/stats', authenticate, requireAdmin, feedbackController.getStats);
router.get('/:id', authenticate, requireAdmin, feedbackController.getOne);
router.put('/:id', authenticate, requireAdmin, feedbackController.update);
router.delete('/:id', authenticate, requireAdmin, feedbackController.delete);

export default router;