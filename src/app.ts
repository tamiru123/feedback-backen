import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import { config } from './config/environment';
import authRoutes from './routes/authRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import sectorRoutes from './routes/sectorRoutes';
import questionRoutes from './routes/questionRoutes';
import { AuthService } from './services/AuthService';

const app = express();
const authService = new AuthService();

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

// ✅ HARDCODED CORS - Allow all origins for testing
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), ip: localIp });
});

// Routes
console.log('📡 Registering routes...');
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/sectors', sectorRoutes);
app.use('/api/questions', questionRoutes);
console.log('✅ Routes registered: /api/auth, /api/feedback, /api/sectors, /api/questions');

// 404 handler
app.use((req: Request, res: Response) => {
  console.log(`❌ 404: ${req.method} ${req.url}`);
  res.status(404).json({ error: `Route not found: ${req.method} ${req.url}` });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const startServer = async (): Promise<void> => {
  await connectDatabase();
  await authService.createAdminIfNotExists();
  
  app.listen(config.PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Server running on:`);
    console.log(`   Local:   http://localhost:${config.PORT}`);
    console.log(`   Network: http://${localIp}:${config.PORT}`);
    console.log(`\n📝 Admin login: ${config.ADMIN_USERNAME} / ${config.ADMIN_PASSWORD}`);
    console.log(`\n📊 Available endpoints:`);
    console.log(`   GET    /health - Health check`);
    console.log(`   POST   /api/auth/login - Login`);
    console.log(`   POST   /api/feedback - Submit feedback`);
    console.log(`   GET    /api/feedback - Get all feedbacks (admin)`);
    console.log(`   GET    /api/sectors - Get sectors`);
    console.log(`   GET    /api/sectors/:id/questions - Get questions by sector`);
    console.log(`   GET    /api/questions - Get all questions (admin)`);
    console.log(`   GET    /api/questions/sector/:sectorId - Get questions by sector`);
    console.log(`   PUT    /api/questions/:id - Update question (admin)`);
    console.log(`   DELETE /api/questions/:id - Delete question (admin)`);
    console.log(`\n🌐 CORS enabled for all origins`);
  });
};

startServer();

export default app;