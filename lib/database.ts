import { Pool } from 'pg';
import { ContactFormData } from './validation';

// Lazy initialization of connection pool
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
    console.log('✅ Database pool created with:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
  }
  return pool;
}

export interface ContactRecord extends ContactFormData {
  id?: number;
  created_at?: Date;
  ip_address?: string;
}

/**
 * Save contact form submission to database
 */
export async function saveContact(data: ContactFormData, ipAddress: string): Promise<number> {
  const client = await getPool().connect();

  try {
    const query = `
      INSERT INTO contacts (name, email, company, message, ip_address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const values = [data.name, data.email, data.company, data.message, ipAddress];
    const result = await client.query(query, values);

    return result.rows[0].id;
  } finally {
    client.release();
  }
}

/**
 * Check rate limit for IP address
 * Returns true if rate limit exceeded
 */
export async function checkRateLimit(ipAddress: string): Promise<boolean> {
  const client = await getPool().connect();

  try {
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX || '5');
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW || '3600000'); // 1 hour default
    const windowStart = new Date(Date.now() - windowMs);

    // Count recent submissions from this IP
    const query = `
      SELECT COUNT(*) as count
      FROM contacts
      WHERE ip_address = $1 AND created_at > $2
    `;

    const result = await client.query(query, [ipAddress, windowStart]);
    const count = parseInt(result.rows[0].count);

    return count >= maxRequests;
  } finally {
    client.release();
  }
}

/**
 * Get all contacts (for admin use)
 */
export async function getContacts(limit: number = 100): Promise<ContactRecord[]> {
  const client = await getPool().connect();

  try {
    const query = `
      SELECT id, name, email, company, message, created_at, ip_address
      FROM contacts
      ORDER BY created_at DESC
      LIMIT $1
    `;

    const result = await client.query(query, [limit]);
    return result.rows;
  } finally {
    client.release();
  }
}

/**
 * Initialize database tables
 * Run this once to create the necessary tables
 */
export async function initDatabase(): Promise<void> {
  const client = await getPool().connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        ip_address VARCHAR(45),
        is_read BOOLEAN DEFAULT false,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
      CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
      CREATE INDEX IF NOT EXISTS idx_contacts_ip_address ON contacts(ip_address);
      CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
      CREATE INDEX IF NOT EXISTS idx_contacts_is_read ON contacts(is_read);
    `);

    console.log('Database tables initialized successfully');
  } finally {
    client.release();
  }
}
