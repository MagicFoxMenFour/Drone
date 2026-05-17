import { Router } from 'express';
import { allAsync, getAsync, runAsync } from '../db/init.js';
import { adminAuthMiddleware, verifyAdminCredentials, createSessionToken } from '../db/auth.js';
import { randomUUID } from 'crypto';

export const adminRoutes = Router();

// Login endpoint
adminRoutes.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    
    if (!login || !password) {
      return res.status(400).json({ error: 'Login and password are required' });
    }
    
    const isValid = await verifyAdminCredentials(login, password);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid login or password' });
    }
    
    const token = createSessionToken(login);
    res.cookie('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7 * 1000 // 7 days
    });
    
    return res.json({ ok: true, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
adminRoutes.post('/logout', (req, res) => {
  res.clearCookie('admin_session');
  res.json({ ok: true });
});

// Get current user
adminRoutes.get('/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.admin_session;
  const session = require('../db/auth.js').verifySessionToken(token);
  
  if (!session) {
    return res.json({ user: null });
  }
  
  res.json({ user: { login: session.login, isAdmin: true } });
});

// Dashboard stats
adminRoutes.get('/dashboard', adminAuthMiddleware, async (req, res) => {
  try {
    const newLeads = await allAsync('SELECT COUNT(*) as count FROM leads WHERE status = ?', ['new']);
    res.json({ newLeads: newLeads[0]?.count || 0 });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generic CRUD endpoints
const collections = ['services', 'cases', 'blog_posts', 'about_page', 'employees', 'leads'];

collections.forEach(collection => {
  // GET all
  adminRoutes.get(`/${collection}`, adminAuthMiddleware, async (req, res) => {
    try {
      const rows = await allAsync(`SELECT * FROM ${collection} ORDER BY updated_at DESC`);
      res.json({ rows });
    } catch (error) {
      console.error(`Error getting ${collection}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST create
  adminRoutes.post(`/${collection}`, adminAuthMiddleware, async (req, res) => {
    try {
      const id = randomUUID();
      const data = { id, ...req.body, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);
      
      await runAsync(
        `INSERT INTO ${collection} (${columns}) VALUES (${placeholders})`,
        values
      );
      
      res.json({ row: data });
    } catch (error) {
      console.error(`Error creating ${collection}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET single
  adminRoutes.get(`/${collection}/:id`, adminAuthMiddleware, async (req, res) => {
    try {
      const row = await getAsync(`SELECT * FROM ${collection} WHERE id = ?`, [req.params.id]);
      
      if (!row) {
        return res.status(404).json({ error: 'Not found' });
      }
      
      res.json({ row });
    } catch (error) {
      console.error(`Error getting ${collection}/:id:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // PATCH update
  adminRoutes.patch(`/${collection}/:id`, adminAuthMiddleware, async (req, res) => {
    try {
      const data = { ...req.body, updated_at: new Date().toISOString() };
      
      const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(data), req.params.id];
      
      const result = await runAsync(
        `UPDATE ${collection} SET ${updates} WHERE id = ?`,
        values
      );
      
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Not found' });
      }
      
      const row = await getAsync(`SELECT * FROM ${collection} WHERE id = ?`, [req.params.id]);
      res.json({ row });
    } catch (error) {
      console.error(`Error updating ${collection}/:id:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // DELETE
  adminRoutes.delete(`/${collection}/:id`, adminAuthMiddleware, async (req, res) => {
    try {
      const result = await runAsync(
        `DELETE FROM ${collection} WHERE id = ?`,
        [req.params.id]
      );
      
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Not found' });
      }
      
      res.json({ ok: true });
    } catch (error) {
      console.error(`Error deleting ${collection}/:id:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});
