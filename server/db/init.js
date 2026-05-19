import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', '..', 'data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'app.db');

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

  const db = getDb();

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

  /* ── Services ─────────────────────────────────────────── */
  const servicesTable = `CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    slug TEXT,
    title TEXT NOT NULL DEFAULT 'Новая услуга',
    short_desc TEXT DEFAULT '',
    full_desc TEXT DEFAULT '',
    icon TEXT DEFAULT '📦',
    color TEXT DEFAULT 'cyan',
    use_cases TEXT DEFAULT '[]',
    process TEXT DEFAULT '[]',
    results TEXT DEFAULT '[]',
    industries TEXT DEFAULT '[]',
    price TEXT DEFAULT '',
    image TEXT,
    published INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`;

  /* ── Cases ─────────────────────────────────────────────── */
  const casesTable = `CREATE TABLE IF NOT EXISTS cases (
    id TEXT PRIMARY KEY,
    slug TEXT,
    category TEXT DEFAULT '',
    title TEXT NOT NULL DEFAULT 'Новый кейс',
    client TEXT DEFAULT '',
    location TEXT DEFAULT '',
    year TEXT DEFAULT '',
    short_desc TEXT DEFAULT '',
    challenge TEXT DEFAULT '',
    solution TEXT DEFAULT '',
    image TEXT,
    images TEXT DEFAULT '[]',
    results TEXT DEFAULT '[]',
    tags TEXT DEFAULT '[]',
    gradient TEXT DEFAULT '',
    accent_color TEXT DEFAULT '',
    published INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`;

  /* ── Blog posts ────────────────────────────────────────── */
  const blogPostsTable = `CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT,
    category TEXT DEFAULT '',
    title TEXT NOT NULL DEFAULT 'Новая статья',
    content TEXT DEFAULT '[]',
    excerpt TEXT DEFAULT '',
    date TEXT DEFAULT '',
    read_time TEXT DEFAULT '',
    tags TEXT DEFAULT '[]',
    accent TEXT DEFAULT '',
    image TEXT,
    published INTEGER DEFAULT 0,
    author TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`;

  /* ── About page ────────────────────────────────────────── */
  const aboutTable = `CREATE TABLE IF NOT EXISTS about_page (
    id TEXT PRIMARY KEY,
    hero_title TEXT DEFAULT '',
    hero_text TEXT DEFAULT '',
    mission_title TEXT DEFAULT '',
    mission_text TEXT DEFAULT '',
    principles TEXT DEFAULT '[]',
    partners TEXT DEFAULT '[]',
    licenses TEXT DEFAULT '[]',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`;

  /* ── Employees ─────────────────────────────────────────── */
  const employeesTable = `CREATE TABLE IF NOT EXISTS employees (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'Новый сотрудник',
    role TEXT DEFAULT '',
    bio TEXT DEFAULT '',
    image TEXT,
    initials TEXT DEFAULT '?',
    color TEXT DEFAULT 'bg-slate-600',
    active INTEGER DEFAULT 1,
    sort INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`;

  /* ── Leads ─────────────────────────────────────────────── */
  const leadsTable = `CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    service TEXT DEFAULT '',
    message TEXT DEFAULT '',
    status TEXT DEFAULT 'new',
    source TEXT DEFAULT 'site',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`;

  /* ── Admin users ───────────────────────────────────────── */
  const adminUsersTable = `CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    login TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`;

  const schemas = [
    servicesTable,
    casesTable,
    blogPostsTable,
    aboutTable,
    employeesTable,
    leadsTable,
    adminUsersTable
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

  /* ── Migrations: add missing columns to existing DB ───── */
  async function getColumns(table) {
    return new Promise((resolve, reject) => {
      db.all(`PRAGMA table_info(${table})`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(r => r.name));
      });
    });
  }

  async function addCol(table, column, definition) {
    try {
      const cols = await getColumns(table);
      if (!cols.includes(column)) {
        console.log(`Adding column ${column} to ${table}`);
        await new Promise((resolve, reject) => {
          db.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
    } catch (e) {
      console.error(`Migration: failed to add ${column} to ${table}:`, e.message);
    }
  }

  /* services: add missing columns */
  await addCol('services', 'slug', 'TEXT');
  await addCol('services', 'title', 'TEXT NOT NULL DEFAULT \'Новая услуга\'');
  await addCol('services', 'short_desc', 'TEXT DEFAULT \'\'');
  await addCol('services', 'full_desc', 'TEXT DEFAULT \'\'');
  await addCol('services', 'icon', 'TEXT DEFAULT \'📦\'');
  await addCol('services', 'color', 'TEXT DEFAULT \'cyan\'');
  await addCol('services', 'use_cases', 'TEXT DEFAULT \'[]\'');
  await addCol('services', 'process', 'TEXT DEFAULT \'[]\'');
  await addCol('services', 'results', 'TEXT DEFAULT \'[]\'');
  await addCol('services', 'industries', 'TEXT DEFAULT \'[]\'');

  /* blog_posts: add missing columns */
  await addCol('blog_posts', 'category', 'TEXT DEFAULT \'\'');
  await addCol('blog_posts', 'date', 'TEXT DEFAULT \'\'');
  await addCol('blog_posts', 'read_time', 'TEXT DEFAULT \'\'');
  await addCol('blog_posts', 'tags', 'TEXT DEFAULT \'[]\'');
  await addCol('blog_posts', 'accent', 'TEXT DEFAULT \'\'');

  /* cases: add missing columns */
  await addCol('cases', 'category', 'TEXT DEFAULT \'\'');
  await addCol('cases', 'client', 'TEXT DEFAULT \'\'');
  await addCol('cases', 'location', 'TEXT DEFAULT \'\'');
  await addCol('cases', 'year', 'TEXT DEFAULT \'\'');
  await addCol('cases', 'short_desc', 'TEXT DEFAULT \'\'');
  await addCol('cases', 'challenge', 'TEXT DEFAULT \'\'');
  await addCol('cases', 'solution', 'TEXT DEFAULT \'\'');
  await addCol('cases', 'results', 'TEXT DEFAULT \'[]\'');
  await addCol('cases', 'tags', 'TEXT DEFAULT \'[]\'');
  await addCol('cases', 'gradient', 'TEXT DEFAULT \'\'');
  await addCol('cases', 'accent_color', 'TEXT DEFAULT \'\'');

  /* about_page: migrate old schema to new */
  await addCol('about_page', 'hero_title', 'TEXT DEFAULT \'\'');
  await addCol('about_page', 'hero_text', 'TEXT DEFAULT \'\'');
  await addCol('about_page', 'mission_title', 'TEXT DEFAULT \'\'');
  await addCol('about_page', 'mission_text', 'TEXT DEFAULT \'\'');
  await addCol('about_page', 'principles', 'TEXT DEFAULT \'[]\'');
  await addCol('about_page', 'partners', 'TEXT DEFAULT \'[]\'');
  await addCol('about_page', 'licenses', 'TEXT DEFAULT \'[]\'');

  console.log('✓ Migrations complete');
}
