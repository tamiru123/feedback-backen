import { Router, Request, Response } from 'express';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
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

// ✅ ADD THIS - Create a new sector (admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, isActive } = req.body;
    
    console.log('📡 POST /api/sectors - Creating new sector');
    console.log('Request body:', req.body);
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    // Create sector
    const sector = await Sector.create({
      name,
      description: description || null,
      isActive: isActive !== undefined ? isActive : true
    });
    
    console.log(`✅ Sector created: ${name} (ID: ${sector.id})`);
    res.status(201).json(sector);
  } catch (error: any) {
    console.error('❌ Error creating sector:', error);
    res.status(500).json({ error: 'Failed to create sector', details: error.message });
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

// Get single sector (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const sector = await Sector.findByPk(req.params.id);
    if (!sector) {
      return res.status(404).json({ error: 'Sector not found' });
    }
    res.json(sector);
  } catch (error) {
    console.error('Error fetching sector:', error);
    res.status(500).json({ error: 'Failed to fetch sector' });
  }
});

// Update sector (admin only)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const sector = await Sector.findByPk(req.params.id);
    if (!sector) {
      return res.status(404).json({ error: 'Sector not found' });
    }
    
    const { name, description, isActive } = req.body;
    await sector.update({
      name: name || sector.name,
      description: description !== undefined ? description : sector.description,
      isActive: isActive !== undefined ? isActive : sector.isActive
    });
    
    console.log(`✅ Sector updated: ${sector.name}`);
    res.json(sector);
  } catch (error) {
    console.error('Error updating sector:', error);
    res.status(500).json({ error: 'Failed to update sector' });
  }
});

// Delete sector (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const sector = await Sector.findByPk(req.params.id);
    if (!sector) {
      return res.status(404).json({ error: 'Sector not found' });
    }
    
    await sector.destroy();
    console.log(`✅ Sector deleted: ${sector.name}`);
    res.json({ message: 'Sector deleted successfully' });
  } catch (error) {
    console.error('Error deleting sector:', error);
    res.status(500).json({ error: 'Failed to delete sector' });
  }
});

export default router;