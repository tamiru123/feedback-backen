"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Sector_1 = __importDefault(require("../models/Sector"));
const Question_1 = __importDefault(require("../models/Question"));
const router = (0, express_1.Router)();
// Get all active sectors (public)
router.get('/', async (req, res) => {
    try {
        console.log('📡 GET /api/sectors - Fetching sectors...');
        const sectors = await Sector_1.default.findAll({
            where: { isActive: true },
            order: [['name', 'ASC']]
        });
        console.log('✅ Found sectors:', sectors.length);
        res.json(sectors);
    }
    catch (err) {
        console.error('❌ Error fetching sectors:', err);
        res.status(500).json({ error: 'Failed to fetch sectors' });
    }
});
// Get questions for a sector (public)
router.get('/:sectorId/questions', async (req, res) => {
    try {
        const { sectorId } = req.params;
        console.log(`📡 GET /api/sectors/${sectorId}/questions`);
        const questions = await Question_1.default.findAll({
            where: { sectorId: parseInt(sectorId), isActive: true },
            order: [['order', 'ASC']]
        });
        console.log('✅ Found questions:', questions.length);
        res.json(questions);
    }
    catch (err) {
        console.error('❌ Error fetching questions:', err);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});
exports.default = router;
//# sourceMappingURL=sectorRoutes.js.map