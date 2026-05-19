import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db/init.js';
import { initializeAdmin } from './db/auth.js';
import { adminRoutes } from './routes/admin.js';
import { leadRoutes } from './routes/lead.js';
import { contentRoutes } from './routes/content.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Graceful shutdown
let server;
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  if (server) server.close(() => process.exit(0));
  else process.exit(0);
});
process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  if (server) server.close(() => process.exit(0));
  else process.exit(0);
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Determine data directory (Amvera uses /data, local dev uses ./data)
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');

(async () => {
  try {
    console.log('Starting application initialization...');
    console.log(`Data directory: ${DATA_DIR}`);
    
    // Ensure data and uploads directories exist
    const uploadsDir = path.join(DATA_DIR, 'uploads');
    await fsPromises.mkdir(uploadsDir, { recursive: true });
    console.log('Uploads directory ready at', uploadsDir);
    
    // Serve uploaded files
    app.use('/uploads', express.static(uploadsDir));

    console.log('Initializing database...');
    await initializeDatabase();
    console.log('Database initialized');
    
    console.log('Initializing admin user...');
    await initializeAdmin();
    console.log('Admin user initialized');

    // API Routes
    app.use('/api/admin', adminRoutes);
    app.use('/api/lead', leadRoutes);
    app.use('/api/content', contentRoutes);

    // Serve static files from React build
    const staticPath = path.join(__dirname, '../dist');
    app.use(express.static(staticPath));

    // SPA fallback - send index.html for all other routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(staticPath, 'index.html'));
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    });

    // Start server
    server = app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Access at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
})();
