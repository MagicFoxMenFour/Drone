import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join('/data', 'app.db');

let db;
let dbReady = false;

export function getDb() {
  if (!db) {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Database connection error:', err);
        throw err;
      } else {
        console.log('Connected to SQLite database at:', DB_PATH);
        dbReady = true;
      }
    });
    db.configure('busyTimeout', 5000);
  }
  return db;
}

export function isDbReady() {
  return dbReady;
}

export function runAsync(query, params = []) {
  return new Promise((resolve, reject) => {
    getDb().run(query, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

export function getAsync(query, params = []) {
  return new Promise((resolve, reject) => {
    getDb().get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function allAsync(query, params = []) {
  return new Promise((resolve, reject) => {
    getDb().all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

export async function initializeDatabase() {
  console.log('Waiting for database connection to be ready...');
  
  // Ensure database is initialized
  const db = getDb();
  
  // Wait for connection to be established
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Database connection timeout'));
    }, 10000);
    
    const checkReady = setInterval(() => {
      if (isDbReady()) {
        clearInterval(checkReady);
        clearTimeout(timeout);
        resolve();
      }
    }, 100);
  });

  console.log('Database connection ready, creating tables...');
  
  const schemas = [
    // Services table
    `CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT,
      image TEXT,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    // Cases table
    `CREATE TABLE IF NOT EXISTS cases (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      category TEXT,
      title TEXT NOT NULL,
      client TEXT,
      location TEXT,
      year TEXT,
      description TEXT,
      short_desc TEXT,
      challenge TEXT,
      solution TEXT,
      image TEXT,
      images TEXT,
      results TEXT,
      tags TEXT,
      gradient TEXT,
      accent_color TEXT,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    // Blog posts table
    `CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE,
      content TEXT,
      excerpt TEXT,
      image TEXT,
      published INTEGER DEFAULT 0,
      author TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    // About page table
    `CREATE TABLE IF NOT EXISTS about_page (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      mission TEXT,
      "values" TEXT, 
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    // Employees table
    `CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT,
      bio TEXT,
      image TEXT,
      initials TEXT,
      color TEXT DEFAULT 'bg-slate-600',
      active INTEGER DEFAULT 1,
      sort INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    // Leads table
    `CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      service TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      source TEXT DEFAULT 'site',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    // Admin users table
    `CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      login TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  for (const schema of schemas) {
    await new Promise((resolve, reject) => {
      db.run(schema, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  console.log('✓ Database tables created/verified');

  // Ensure missing columns are added for existing databases (migrations)
  async function ensureColumn(table, column, definition) {
    const info = await new Promise((resolve, reject) => {
      db.all(`PRAGMA table_info(${table})`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
    const exists = info.some((c) => c.name === column);
    if (!exists) {
      console.log(`Adding missing column ${column} to ${table}`);
      await runSql(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    }
  }

  function runSql(sql) {
    return new Promise((resolve, reject) => {
      db.run(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  try {
    // blog_posts: add category, date, read_time, tags, accent
    await ensureColumn('blog_posts', 'category', 'TEXT');
    await ensureColumn('blog_posts', 'date', 'TEXT');
    await ensureColumn('blog_posts', 'read_time', 'TEXT');
    await ensureColumn('blog_posts', 'tags', 'TEXT');
    await ensureColumn('blog_posts', 'accent', 'TEXT');

    // cases: add commonly used columns (if DB created earlier)
    await ensureColumn('cases', 'slug', 'TEXT UNIQUE');
    await ensureColumn('cases', 'category', 'TEXT');
    await ensureColumn('cases', 'client', 'TEXT');
    await ensureColumn('cases', 'location', 'TEXT');
    await ensureColumn('cases', 'year', 'TEXT');
    await ensureColumn('cases', 'short_desc', 'TEXT');
    await ensureColumn('cases', 'challenge', 'TEXT');
    await ensureColumn('cases', 'solution', 'TEXT');
    await ensureColumn('cases', 'results', 'TEXT');
    await ensureColumn('cases', 'tags', 'TEXT');
    await ensureColumn('cases', 'gradient', 'TEXT');
    await ensureColumn('cases', 'accent_color', 'TEXT');
  } catch (merr) {
    console.error('Migration error:', merr);
  }
}
