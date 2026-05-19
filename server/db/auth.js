import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { getAsync, runAsync } from './init.js';

const ADMIN_LOGIN = process.env.ADMIN_LOGIN || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Initialize default admin user
export async function initializeAdmin() {
  try {
    const existing = await getAsync('SELECT * FROM admin_users WHERE login = ?', [ADMIN_LOGIN]);
    
    if (!existing) {
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      const id = crypto.randomUUID();
      await runAsync(
        `INSERT INTO admin_users (id, login, password_hash) VALUES (?, ?, ?)`,
        [id, ADMIN_LOGIN, passwordHash]
      );
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

export async function verifyAdminCredentials(login, password) {
  try {
    const user = await getAsync('SELECT * FROM admin_users WHERE login = ?', [login]);
    
    if (!user) return false;
    
    return await bcrypt.compare(password, user.password_hash);
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return false;
  }
}

export function createSessionToken(login) {
  const payload = {
    login,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function verifySessionToken(token) {
  try {
    if (!token) return null;
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Token expired
    }
    
    return payload;
  } catch (error) {
    return null;
  }
}

export function adminAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    const session = verifySessionToken(req.cookies?.admin_session);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    const session = verifySessionToken(token);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  
  next();
}
