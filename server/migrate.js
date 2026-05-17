import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runAsync, initializeDatabase } from './db/init.js';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrateFromJson() {
  console.log('Starting migration from JSON to SQLite...');
  
  await initializeDatabase();

  const collections = {
    'services': 'services',
    'cases': 'cases', 
    'blog_posts': 'blog_posts',
    'about_page': 'about_page',
    'employees': 'employees',
    'leads': 'leads'
  };

  for (const [jsonFile, tableName] of Object.entries(collections)) {
    const jsonPath = path.join(__dirname, '../content', `${jsonFile}.json`);
    
    if (fs.existsSync(jsonPath)) {
      try {
        console.log(`Migrating ${jsonFile}...`);
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        
        if (Array.isArray(data)) {
          for (const item of data) {
            const columns = Object.keys(item).map(key => `"${key}"`).join(', ');
            const placeholders = Object.keys(item).map(() => '?').join(', ');
            const values = Object.values(item);
            
            try {
              await runAsync(
                `INSERT OR IGNORE INTO ${tableName} (${columns}) VALUES (${placeholders})`,
                values
              );
            } catch (err) {
              console.warn(`  Warning: Could not insert item ${item.id}: ${err.message}`);
            }
          }
          console.log(`  ✓ Migrated ${data.length} items`);
        }
      } catch (error) {
        console.error(`  ✗ Error migrating ${jsonFile}:`, error.message);
      }
    }
  }

  console.log('Migration complete!');
  process.exit(0);
}

migrateFromJson().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
