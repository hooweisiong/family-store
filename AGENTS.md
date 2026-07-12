# Grocery Delivery System — Agent Instructions

## InsForge MCP Server

The backend is powered by the InsForge MCP Server. All database operations go through it.

### PostgreSQL Migrations to Deploy

Run these migrations on the InsForge MCP server in order:

1. **users** table:
   - `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - `email` VARCHAR(255) UNIQUE NOT NULL
   - `password_hash` VARCHAR(255) NOT NULL
   - `role` VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'staff', 'driver'))
   - `created_at` TIMESTAMPTZ DEFAULT NOW()

2. **products** table:
   - `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - `barcode_string` VARCHAR(100) UNIQUE NOT NULL (INDEXED)
   - `name` VARCHAR(255) NOT NULL
   - `brand` VARCHAR(255)
   - `price` DECIMAL(10,2) NOT NULL
   - `stock_quantity` INTEGER NOT NULL DEFAULT 0
   - `image_url` TEXT
   - `created_at` TIMESTAMPTZ DEFAULT NOW()

3. **orders** table:
   - `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - `customer_id` UUID NOT NULL REFERENCES users(id)
   - `total_price` DECIMAL(10,2) NOT NULL
   - `status` VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','preparing','out_for_delivery','delivered','cancelled'))
   - `delivery_fee` DECIMAL(10,2) NOT NULL DEFAULT 0
   - `created_at` TIMESTAMPTZ DEFAULT NOW()

4. **order_items** table:
   - `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - `order_id` UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE
   - `product_id` UUID NOT NULL REFERENCES products(id)
   - `quantity` INTEGER NOT NULL CHECK (quantity > 0)

### API Endpoints Required

| Method | Endpoint                    | Auth     | Description              |
|--------|-----------------------------|----------|--------------------------|
| POST   | /api/auth/register          | No       | Create account           |
| POST   | /api/auth/login             | No       | Sign in                  |
| GET    | /api/auth/me                | Bearer   | Get current user         |
| GET    | /api/products               | No       | List/search products     |
| GET    | /api/products/:id           | No       | Get product              |
| GET    | /api/products/barcode/:code | No       | Lookup by barcode        |
| POST   | /api/products               | Admin    | Create product           |
| PUT    | /api/products/:id           | Admin    | Update product           |
| DELETE | /api/products/:id           | Admin    | Delete product           |
| GET    | /api/orders                 | Bearer   | List user orders         |
| POST   | /api/orders                 | Bearer   | Create order             |
| GET    | /api/orders/:id             | Bearer   | Get order details        |
| PATCH  | /api/orders/:id/status      | Staff    | Update order status      |
| WS     | /ws/orders                  | Bearer   | Real-time order updates  |
