import Feedback from '../models/Feedback';
import { Op, Sequelize } from 'sequelize';

export class FeedbackService {
  
  // Create new feedback
  async createFeedback(data: any) {
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
      const feedback = await Feedback.create({
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
      
    } catch (error) {
      console.error('❌ Create feedback error:', error);
      throw error;
    }
  }
  
  // Get all feedback
  async getAllFeedback() {
    try {
      const feedbacks = await Feedback.findAll({
        order: [['createdAt', 'DESC']]
      });
      return feedbacks;
    } catch (error) {
      console.error('❌ Get all feedback error:', error);
      throw error;
    }
  }
  
  // Get feedback by ID
  async getFeedbackById(id: number) {
    try {
      const feedback = await Feedback.findByPk(id);
      return feedback;
    } catch (error) {
      console.error('❌ Get feedback by ID error:', error);
      throw error;
    }
  }
  
  // Get feedback statistics
  async getFeedbackStats() {
    try {
      const total = await Feedback.count();
      
      // Calculate average rating
      const avgResult = await Feedback.findOne({
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']
        ],
        raw: true
      });
      
      const averageRating = avgResult ? parseFloat((avgResult as any).averageRating || 0).toFixed(2) : 0;
      
      // Get rating distribution
      const ratingDistribution = await Feedback.findAll({
        attributes: [
          'rating',
          [Sequelize.fn('COUNT', Sequelize.col('rating')), 'count']
        ],
        group: ['rating'],
        order: [['rating', 'ASC']],
        raw: true
      });
      
      // Get word rating distribution
      const wordRatingDistribution = await Feedback.findAll({
        attributes: [
          'wordRating',
          [Sequelize.fn('COUNT', Sequelize.col('wordRating')), 'count']
        ],
        group: ['wordRating'],
        order: [[Sequelize.literal('count'), 'DESC']],
        raw: true
      });
      
      // ✅ Get topic counts from the topics JSON column
      let topicCounts: Record<string, number> = {};
      const allFeedbacks = await Feedback.findAll({
        attributes: ['topics'],
        raw: true
      });
      
      allFeedbacks.forEach((fb: any) => {
        if (fb.topics && Array.isArray(fb.topics)) {
          fb.topics.forEach((topic: string) => {
            topicCounts[topic] = (topicCounts[topic] || 0) + 1;
          });
        }
      });
      
      // ✅ Get question answer statistics from the answers JSON column
      let questionStats: any = {};
      const allAnswers = await Feedback.findAll({
        attributes: ['answers'],
        raw: true
      });
      
      allAnswers.forEach((fb: any) => {
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
      
      const recentFeedback = await Feedback.count({
        where: {
          createdAt: {
            [Op.gte]: sevenDaysAgo
          }
        }
      });
      
      return {
        total,
        averageRating: parseFloat(averageRating as string),
        recentFeedback,
        ratingDistribution: ratingDistribution.map(item => ({
          rating: (item as any).rating,
          count: parseInt((item as any).count)
        })),
        wordRatingDistribution: wordRatingDistribution.map(item => ({
          wordRating: (item as any).wordRating,
          count: parseInt((item as any).count)
        })),
        topicCounts,        // ✅ Added
        questionStats       // ✅ Added
      };
    } catch (error) {
      console.error('❌ Get stats error:', error);
      throw error;
    }
  }
  
  // Update feedback
  async updateFeedback(id: number, data: any) {
    try {
      const feedback = await Feedback.findByPk(id);
      if (!feedback) {
        throw new Error('Feedback not found');
      }
      
      // If rating is updated, also update wordRating
      if (data.rating && !data.wordRating) {
        const wordRatingMap: { [key: number]: string } = {
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
    } catch (error) {
      console.error('❌ Update feedback error:', error);
      throw error;
    }
  }
  
  // Delete feedback
  async deleteFeedback(id: number) {
    try {
      const feedback = await Feedback.findByPk(id);
      if (!feedback) {
        throw new Error('Feedback not found');
      }
      
      await feedback.destroy();
      return true;
    } catch (error) {
      console.error('❌ Delete feedback error:', error);
      throw error;
    }
  }
}