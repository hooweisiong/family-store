// InsForge MCP database client helpers
// These functions will interface with the InsForge MCP server
// to execute PostgreSQL queries and migrations.

const MCP_URL = process.env.NEXT_PUBLIC_MCP_URL || 'http://localhost:4000/mcp';

export interface Migration {
  name: string;
  sql: string;
}

export const migrations: Migration[] = [
  {
    name: '001_create_users',
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'staff', 'driver')),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `,
  },
  {
    name: '002_create_products',
    sql: `
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        barcode_string VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255),
        price DECIMAL(10,2) NOT NULL,
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode_string);
    `,
  },
  {
    name: '003_create_orders',
    sql: `
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_id UUID NOT NULL REFERENCES users(id),
        total_price DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending','confirmed','preparing','out_for_delivery','delivered','cancelled')),
        delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `,
  },
  {
    name: '004_create_order_items',
    sql: `
      CREATE TABLE IF NOT EXISTS order_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id),
        quantity INTEGER NOT NULL CHECK (quantity > 0)
      );
    `,
  },
];

export async function runMigrations(): Promise<void> {
  for (const migration of migrations) {
    console.log(`Running migration: ${migration.name}`);
    // TODO: execute migration.sql via InsForge MCP client
    // await mcpClient.query(migration.sql);
  }
  console.log('All migrations completed.');
}
