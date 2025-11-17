import { initDatabase } from './lib/database';

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
