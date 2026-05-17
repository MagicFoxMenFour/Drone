import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db/init.js';
import { adminRoutes } from './routes/admin.js';
import { leadRoutes } from './routes/lead.js';
import { contentRoutes } from './routes/content.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
await initializeDatabase();

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
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access at http://localhost:${PORT}`);
});
