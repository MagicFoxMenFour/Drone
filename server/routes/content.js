import { Router } from 'express';
import { allAsync, getAsync } from '../db/init.js';

export const contentRoutes = Router();

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
      services: services || [],
      cases: cases_data || [],
      blog_posts: blog_posts || [],
      about_page: about_page || null,
      employees: employees || []
    });
  } catch (error) {
    console.error('Content retrieval error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
