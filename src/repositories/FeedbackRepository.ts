import Feedback from '../models/Feedback';
import { FeedbackAttributes, FeedbackStats } from '../types';
import { Op } from 'sequelize';

export class FeedbackRepository {
  async create(feedbackData: Partial<FeedbackAttributes>): Promise<Feedback> {
    return await Feedback.create(feedbackData as any);
  }

  async findAll(limit: number = 100, offset: number = 0): Promise<Feedback[]> {
    return await Feedback.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
  }

  async findById(id: number): Promise<Feedback | null> {
    return await Feedback.findByPk(id);
  }

  async update(id: number, updateData: Partial<FeedbackAttributes>): Promise<Feedback | null> {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) return null;
    return await feedback.update(updateData);
  }

  async delete(id: number): Promise<boolean> {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) return false;
    await feedback.destroy();
    return true;
  }

  async getStats(): Promise<FeedbackStats> {
    const feedbacks = await Feedback.findAll();
    const total = feedbacks.length;
    
    const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const wordRatingCounts: Record<string, number> = {};
    const topicCounts: Record<string, number> = {};
    
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