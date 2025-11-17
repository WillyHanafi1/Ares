// Load environment variables FIRST before any imports
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Now import database module (Pool will use loaded env vars)
import { initDatabase } from '../lib/database';

async function setup() {
  try {
    console.log('Initializing database...');
    await initDatabase();
    console.log(' Database initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error(' Database initialization failed:', error);
    process.exit(1);
  }
}

setup();
