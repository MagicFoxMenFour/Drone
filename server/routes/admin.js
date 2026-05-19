import { Router } from 'express';
import { allAsync, getAsync, runAsync } from '../db/init.js';
import { adminAuthMiddleware, verifyAdminCredentials, createSessionToken, verifySessionToken } from '../db/auth.js';
import { randomUUID } from 'node:crypto';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const adminRoutes = Router();

// multer setup for uploads
const uploadBase = process.env.DATA_DIR || path.join(__dirname, '..', '..', 'data');
const uploadsDir = path.join(uploadBase, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-z0-9.\-]/gi, '_')}`)
});
const upload = multer({ storage });

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
  const session = verifySessionToken(token);
  
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

// ── JSON & boolean helpers ─────────────────────────────────────
const JSON_COLUMNS = {
  services:    ['use_cases', 'process', 'results', 'industries'],
  cases:       ['results', 'tags'],
  blog_posts:  ['content', 'tags'],
  about_page:  ['principles', 'partners', 'licenses'],
  employees:   [],
  leads:       [],
};

/** Parse JSON string columns back into objects/arrays, and convert 0/1 back to boolean. */
function deserializeRow(row, collection) {
  if (!row) return row;
  const out = { ...row };
  const jsonCols = JSON_COLUMNS[collection] || [];
  for (const col of jsonCols) {
    if (typeof out[col] === 'string') {
      try { out[col] = JSON.parse(out[col]); } catch { out[col] = []; }
    }
  }
  // Convert integer-booleans back to real booleans
  if (out.published !== undefined) out.published = out.published === 1 || out.published === true;
  if (out.active !== undefined)    out.active    = out.active === 1 || out.active === true;
  return out;
}

function deserializeRows(rows, collection) {
  return (rows || []).map(r => deserializeRow(r, collection));
}

async function getTableColumns(table) {
  const rows = await allAsync(`PRAGMA table_info(${table})`);
  return rows.map(r => r.name);
}

// Generic CRUD endpoints
const collections = ['services', 'cases', 'blog_posts', 'about_page', 'employees', 'leads'];

collections.forEach(collection => {
  // GET all
  adminRoutes.get(`/${collection}`, adminAuthMiddleware, async (req, res) => {
    try {
      const rows = await allAsync(`SELECT * FROM ${collection} ORDER BY updated_at DESC`);
      res.json({ rows: deserializeRows(rows, collection) });
    } catch (error) {
      console.error(`Error getting ${collection}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST create
  adminRoutes.post(`/${collection}`, adminAuthMiddleware, async (req, res) => {
    try {
      const id = randomUUID();
      let data = { id, ...req.body, updated_at: new Date().toISOString() };

      // Serialize objects/arrays for storage and normalize booleans
      Object.keys(data).forEach((k) => {
        const v = data[k];
        if (Array.isArray(v) || (typeof v === 'object' && v !== null)) data[k] = JSON.stringify(v);
        if (typeof v === 'boolean') data[k] = v ? 1 : 0;
      });

      // Filter to existing columns only
      const cols = await getTableColumns(collection);
      data = Object.fromEntries(Object.entries(data).filter(([k]) => cols.includes(k)));
      
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);
      
      await runAsync(
        `INSERT INTO ${collection} (${columns}) VALUES (${placeholders})`,
        values
      );
      
      res.json({ row: deserializeRow(data, collection) });
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
      
      res.json({ row: deserializeRow(row, collection) });
    } catch (error) {
      console.error(`Error getting ${collection}/:id:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // PATCH update
  adminRoutes.patch(`/${collection}/:id`, adminAuthMiddleware, async (req, res) => {
    try {
      let data = { ...req.body, updated_at: new Date().toISOString() };
      // Serialize objects/arrays and normalize booleans
      Object.keys(data).forEach((k) => {
        const v = data[k];
        if (Array.isArray(v) || (typeof v === 'object' && v !== null)) data[k] = JSON.stringify(v);
        if (typeof v === 'boolean') data[k] = v ? 1 : 0;
      });

      // Filter to existing columns only
      const cols = await getTableColumns(collection);
      data = Object.fromEntries(Object.entries(data).filter(([k]) => cols.includes(k)));
      if (Object.keys(data).length === 0) return res.status(400).json({ error: 'No valid fields to update' });
      
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
      res.json({ row: deserializeRow(row, collection) });
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

  // Upload avatar for employee
  if (collection === 'employees') {
    adminRoutes.post('/employees/:id/avatar', adminAuthMiddleware, upload.single('avatar'), async (req, res) => {
      try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const rel = `/uploads/${req.file.filename}`;
        await runAsync(`UPDATE employees SET image = ? WHERE id = ?`, [rel, req.params.id]);
        const row = await getAsync(`SELECT * FROM employees WHERE id = ?`, [req.params.id]);
        return res.json({ row: deserializeRow(row, 'employees') });
      } catch (e) {
        console.error('Avatar upload error:', e);
        res.status(500).json({ error: 'Upload failed' });
      }
    });
  }
});
