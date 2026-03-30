import { Router, Request, Response } from 'express';
import Sector from '../models/Sector';
import Question from '../models/Question';

const router = Router();

// Get all active sectors (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('📡 GET /api/sectors - Fetching sectors...');
    const sectors = await Sector.findAll({
      where: { isActive: true },
      order: [['name', 'ASC']]
    });
    console.log('✅ Found sectors:', sectors.length);
    res.json(sectors);
  } catch (err) {
    console.error('❌ Error fetching sectors:', err);
    res.status(500).json({ error: 'Failed to fetch sectors' });
  }
});

// Get questions for a sector (public)
router.get('/:sectorId/questions', async (req: Request, res: Response) => {
  try {
    const { sectorId } = req.params;
    console.log(`📡 GET /api/sectors/${sectorId}/questions`);
    const questions = await Question.findAll({
      where: { sectorId: parseInt(sectorId), isActive: true },
      order: [['order', 'ASC']]
    });
    console.log('✅ Found questions:', questions.length);
    res.json(questions);
  } catch (err) {
    console.error('❌ Error fetching questions:', err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

export default router;