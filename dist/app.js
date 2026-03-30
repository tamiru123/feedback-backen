"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
const AuthService_1 = require("./services/AuthService");
const environment_1 = require("./config/environment");
const app = (0, express_1.default)();
const authService = new AuthService_1.AuthService();
// Middleware
app.use((0, cors_1.default)({
    origin: environment_1.config.CORS_ORIGIN,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/feedback', feedbackRoutes_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// Start server
const startServer = async () => {
    await (0, database_1.connectDatabase)();
    await authService.createAdminIfNotExists();
    app.listen(environment_1.config.PORT, () => {
        console.log(`🚀 Server running on http://localhost:${environment_1.config.PORT}`);
        console.log(`📝 Admin login: ${environment_1.config.ADMIN_USERNAME} / ${environment_1.config.ADMIN_PASSWORD}`);
        console.log(`📊 API endpoints:`);
        console.log(`   POST   /api/auth/login - Login`);
        console.log(`   POST   /api/feedback - Submit feedback (public)`);
        console.log(`   GET    /api/feedback - Get all feedbacks (admin)`);
        console.log(`   GET    /api/feedback/:id - Get feedback by ID (admin)`);
        console.log(`   PUT    /api/feedback/:id - Update feedback (admin)`);
        console.log(`   DELETE /api/feedback/:id - Delete feedback (admin)`);
        console.log(`   GET    /api/feedback/stats - Get statistics (admin)`);
    });
};
startServer();
exports.default = app;
//# sourceMappingURL=app.js.map