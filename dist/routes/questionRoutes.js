"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/questionRoutes.ts
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const Question_1 = __importDefault(require("../models/Question"));
const router = (0, express_1.Router)();
// ========== PUBLIC ROUTES ==========
// Get questions by sector (for feedback form)
router.get('/sector/:sectorId', async (req, res) => {
    try {
        const { sectorId } = req.params;
        const { activeOnly } = req.query;
        const where = { sectorId: parseInt(sectorId) };
        if (activeOnly === 'true')
            where.isActive = true;
        const questions = await Question_1.default.findAll({
            where,
            order: [['order', 'ASC'], ['createdAt', 'ASC']]
        });
        res.json({
            success: true,
            data: questions,
            count: questions.length
        });
    }
    catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch questions'
        });
    }
});
// ========== ADMIN ROUTES ==========
// GET all questions (admin only)
router.get('/', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const { sectorId, isActive } = req.query;
        const where = {};
        if (sectorId)
            where.sectorId = parseInt(sectorId);
        if (isActive !== undefined)
            where.isActive = isActive === 'true';
        const questions = await Question_1.default.findAll({
            where,
            order: [['order', 'ASC']]
        });
        res.json({
            success: true,
            data: questions,
            count: questions.length
        });
    }
    catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch questions'
        });
    }
});
// GET single question (admin only)
router.get('/:id', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question_1.default.findByPk(parseInt(id));
        if (!question) {
            return res.status(404).json({
                success: false,
                error: 'Question not found'
            });
        }
        res.json({
            success: true,
            data: question
        });
    }
    catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch question'
        });
    }
});
// ✅ CREATE new question (admin only) - THIS IS THE ENDPOINT YOU NEED
router.post('/', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const { sectorId, type, text, options, required, order, isActive } = req.body;
        console.log('📡 POST /api/questions - Creating new question');
        console.log('Request body:', req.body);
        // Validate required fields
        if (!sectorId) {
            return res.status(400).json({
                success: false,
                error: 'sectorId is required'
            });
        }
        if (!type) {
            return res.status(400).json({
                success: false,
                error: 'type is required'
            });
        }
        if (!text) {
            return res.status(400).json({
                success: false,
                error: 'text is required'
            });
        }
        const validTypes = ['radio', 'checkbox', 'text', 'textarea', 'rating'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                error: `Invalid type. Must be: ${validTypes.join(', ')}`
            });
        }
        // Validate options for radio and checkbox
        if ((type === 'radio' || type === 'checkbox') && (!options || !Array.isArray(options) || options.length === 0)) {
            return res.status(400).json({
                success: false,
                error: 'Options are required for radio and checkbox questions'
            });
        }
        const question = await Question_1.default.create({
            sectorId,
            type,
            text,
            options: options || null,
            required: required || false,
            order: order || 0,
            isActive: isActive !== undefined ? isActive : true
        });
        console.log(`✅ Question created with ID: ${question.id}`);
        res.status(201).json({
            success: true,
            message: 'Question created successfully',
            data: question
        });
    }
    catch (error) {
        console.error('❌ Error creating question:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create question',
            details: error.message
        });
    }
});
// UPDATE question (admin only)
router.put('/:id', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { type, text, options, required, order, isActive, sectorId } = req.body;
        const question = await Question_1.default.findByPk(parseInt(id));
        if (!question) {
            return res.status(404).json({
                success: false,
                error: 'Question not found'
            });
        }
        await question.update({
            sectorId: sectorId || question.sectorId,
            type: type || question.type,
            text: text || question.text,
            options: options !== undefined ? options : question.options,
            required: required !== undefined ? required : question.required,
            order: order !== undefined ? order : question.order,
            isActive: isActive !== undefined ? isActive : question.isActive
        });
        res.json({
            success: true,
            message: 'Question updated successfully',
            data: question
        });
    }
    catch (error) {
        console.error('❌ Error updating question:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update question'
        });
    }
});
// DELETE question (admin only)
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question_1.default.findByPk(parseInt(id));
        if (!question) {
            return res.status(404).json({
                success: false,
                error: 'Question not found'
            });
        }
        await question.destroy();
        res.json({
            success: true,
            message: 'Question deleted successfully'
        });
    }
    catch (error) {
        console.error('❌ Error deleting question:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete question'
        });
    }
});
// TOGGLE question status (admin only)
router.patch('/:id/toggle', auth_1.authenticate, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question_1.default.findByPk(parseInt(id));
        if (!question) {
            return res.status(404).json({
                success: false,
                error: 'Question not found'
            });
        }
        await question.update({ isActive: !question.isActive });
        res.json({
            success: true,
            message: `Question ${question.isActive ? 'activated' : 'deactivated'} successfully`,
            data: question
        });
    }
    catch (error) {
        console.error('❌ Error toggling question status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to toggle question status'
        });
    }
});
exports.default = router;
//# sourceMappingURL=questionRoutes.js.map