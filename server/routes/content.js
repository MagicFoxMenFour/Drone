import { Router } from 'express';
import { allAsync, getAsync } from '../db/init.js';

export const contentRoutes = Router();

// Columns that are stored as JSON strings
const JSON_COLS = {
  services:    ['use_cases', 'process', 'results', 'industries'],
  cases:       ['results', 'tags'],
  blog_posts:  ['content', 'tags'],
  about_page:  ['principles', 'partners', 'licenses'],
  employees:   [],
};

function deserializeRow(row, table) {
  if (!row) return row;
  const out = { ...row };
  const cols = JSON_COLS[table] || [];
  for (const col of cols) {
    if (typeof out[col] === 'string') {
      try { out[col] = JSON.parse(out[col]); } catch { out[col] = []; }
    }
  }
  if (out.published !== undefined) out.published = out.published === 1 || out.published === true;
  if (out.active !== undefined)    out.active    = out.active === 1 || out.active === true;
  return out;
}

contentRoutes.get('/', async (req, res) => {
  try {
    const [services, cases_data, blog_posts, about_page, employees] = await Promise.all([
      allAsync('SELECT * FROM services WHERE published = 1 ORDER BY updated_at DESC'),
      allAsync('SELECT * FROM cases WHERE published = 1 ORDER BY updated_at DESC'),
      allAsync('SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC'),
      getAsync('SELECT * FROM about_page LIMIT 1'),
      allAsync('SELECT * FROM employees WHERE active = 1 ORDER BY sort ASC')
    ]);

    res.json({
      services: (services || []).map(r => deserializeRow(r, 'services')),
      cases: (cases_data || []).map(r => deserializeRow(r, 'cases')),
      blog_posts: (blog_posts || []).map(r => deserializeRow(r, 'blog_posts')),
      about_page: deserializeRow(about_page, 'about_page'),
      employees: (employees || []).map(r => deserializeRow(r, 'employees'))
    });
  } catch (error) {
    console.error('Content retrieval error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
