"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const environment_1 = require("./config/environment");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
const sectorRoutes_1 = __importDefault(require("./routes/sectorRoutes"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes")); // ✅ ADD THIS IMPORT
const AuthService_1 = require("./services/AuthService");
const app = (0, express_1.default)();
const authService = new AuthService_1.AuthService();
// Get local IP address
const os = require('os');
const getLocalIp = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
};
const localIp = getLocalIp();
// CORS - Allow all origins
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), ip: localIp });
});
// Routes - Make sure all routes are registered
console.log('📡 Registering routes...');
app.use('/api/auth', authRoutes_1.default);
app.use('/api/feedback', feedbackRoutes_1.default);
app.use('/api/sectors', sectorRoutes_1.default);
app.use('/api/questions', questionRoutes_1.default); // ✅ ADD THIS LINE
console.log('✅ Routes registered: /api/auth, /api/feedback, /api/sectors, /api/questions');
// 404 handler
app.use((req, res) => {
    console.log(`❌ 404: ${req.method} ${req.url}`);
    res.status(404).json({ error: `Route not found: ${req.method} ${req.url}` });
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
    app.listen(environment_1.config.PORT, '0.0.0.0', () => {
        console.log(`\n🚀 Server running on:`);
        console.log(`   Local:   http://localhost:${environment_1.config.PORT}`);
        console.log(`   Network: http://${localIp}:${environment_1.config.PORT}`);
        console.log(`\n📝 Admin login: ${environment_1.config.ADMIN_USERNAME} / ${environment_1.config.ADMIN_PASSWORD}`);
        console.log(`\n📊 Available endpoints:`);
        console.log(`   GET    /health - Health check`);
        console.log(`   POST   /api/auth/login - Login`);
        console.log(`   POST   /api/feedback - Submit feedback`);
        console.log(`   GET    /api/feedback - Get all feedbacks (admin)`);
        console.log(`   GET    /api/sectors - Get sectors`);
        console.log(`   GET    /api/sectors/:id/questions - Get questions by sector`);
        console.log(`   GET    /api/questions - Get all questions (admin)`); // ✅ ADDED
        console.log(`   GET    /api/questions/sector/:sectorId - Get questions by sector`); // ✅ ADDED
        console.log(`   PUT    /api/questions/:id - Update question (admin)`); // ✅ ADDED
        console.log(`   DELETE /api/questions/:id - Delete question (admin)`); // ✅ ADDED
    });
};
startServer();
exports.default = app;
//# sourceMappingURL=app.js.map