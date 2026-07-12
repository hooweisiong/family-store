# Grocery Delivery System — Implementation Plan

## Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (providers, nav)
│   ├── page.tsx                  # Home / landing page
│   ├── globals.css               # Tailwind imports + Leaflet styles
│   ├── auth/
│   │   └── page.tsx              # Login / Register
│   ├── products/
│   │   ├── page.tsx              # Product listing + search
│   │   └── [id]/page.tsx         # Product detail
│   ├── cart/
│   │   └── page.tsx              # Cart overview
│   ├── checkout/
│   │   └── page.tsx              # Checkout + delivery map
│   ├── orders/
│   │   ├── page.tsx              # Order history
│   │   └── [id]/page.tsx         # Order detail / live tracking
│   ├── admin/
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── products/page.tsx     # Product management
│   │   └── orders/page.tsx       # Order management
│   └── driver/
│       └── page.tsx              # Driver delivery view
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Top navigation bar
│   │   ├── MobileNav.tsx         # Bottom mobile nav
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── Spinner.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartDrawer.tsx
│   ├── map/
│   │   ├── DeliveryMap.tsx       # Leaflet + OSM tile map
│   │   └── DriverRoute.tsx       # Live route display
│   ├── scanner/
│   │   └── BarcodeScanner.tsx    # HTML5-QRCode camera scanner
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductSearch.tsx
│   └── orders/
│       ├── OrderCard.tsx
│       ├── OrderTimeline.tsx     # Status timeline widget
│       └── LiveTracker.tsx       # WebSocket live tracker
├── store/
│   ├── index.ts                  # Combined Zustand store
│   ├── slices/
│   │   ├── cartSlice.ts          # Cart state + actions
│   │   ├── authSlice.ts          # Auth state
│   │   └── orderSlice.ts         # Order state
├── hooks/
│   ├── useWebSocket.ts           # WebSocket connection hook
│   ├── useGeolocation.ts         # Browser geolocation hook
│   └── useBarcodeScanner.ts      # Camera scanner hook
├── lib/
│   ├── api.ts                    # Axios/fetch wrapper for InsForge
│   ├── db.ts                     # InsForge MCP client helpers
│   └── utils.ts                  # Utility functions (currency, etc.)
├── services/
│   ├── auth.ts                   # Auth service (InsForge)
│   ├── products.ts               # Product service
│   ├── orders.ts                 # Order service
│   └── websocket.ts              # WebSocket service
└── types/
    ├── index.ts                  # Shared types (User, Product, Order, etc.)
    └── api.ts                    # API response types
```

## Component Tree (Key Pages)

```
RootLayout
├── Navbar / MobileNav
└── <Page>
    ├── Home → ProductGrid → ProductCard
    ├── Products → ProductSearch + ProductGrid → ProductCard
    ├── Cart → CartItem[] + CartSummary
    ├── Checkout → DeliveryMap (Leaflet) + BarcodeScanner
    ├── Orders → OrderCard[] → OrderTimeline + LiveTracker
    ├── Admin → Product CRUD + Order management
    └── Driver → DeliveryMap (DriverRoute) + LiveTracker
```

## State Architecture (Zustand)

| Slice       | State                                  | Actions                                    |
|-------------|----------------------------------------|--------------------------------------------|
| cartSlice   | items[], isDrawerOpen                  | addItem, removeItem, updateQty, clearCart  |
| authSlice   | user, token, isAuthenticated           | login, register, logout, refreshToken      |
| orderSlice  | orders[], activeOrder, socketStatus    | fetchOrders, createOrder, updateOrderStatus |

## Data Flow

```
Browser → Next.js Pages → Zustand Store
                            ├── REST calls (fetch/axios) → InsForge MCP → PostgreSQL
                            └── WebSocket connection → InsForge WS Gateway → Real-time events
```

## InsForge MCP Integration

| Endpoint              | Method | Purpose                       |
|-----------------------|--------|-------------------------------|
| /api/auth/register    | POST   | Create user                   |
| /api/auth/login       | POST   | Authenticate                  |
| /api/products         | GET    | List/search products          |
| /api/products/:id     | GET    | Single product                |
| /api/products         | POST   | Create product (admin)        |
| /api/products/:id     | PUT    | Update product (admin)        |
| /api/orders           | GET    | List user orders              |
| /api/orders           | POST   | Create order (checkout)       |
| /api/orders/:id       | GET    | Single order                  |
| /api/orders/:id/status| PATCH  | Update order status           |
| ws://insforge/ws/orders| WS   | Real-time order updates       |

## PostgreSQL Migrations (InsForge)

- **users**: id (UUID PK), email (UNIQUE), password_hash, role (ENUM: customer/staff/driver), created_at
- **products**: id (UUID PK), barcode_string (INDEXED), name, brand, price, stock_quantity, image_url, created_at
- **orders**: id (UUID PK), customer_id (FK→users), total_price, status (ENUM), delivery_fee, created_at
- **order_items**: id (UUID PK), order_id (FK→orders), product_id (FK→products), quantity

## Implementation Order

1. Project scaffolding + dependencies ✓
2. Type definitions + Zustand stores
3. UI primitives (Button, Input, Card, etc.)
4. Layout (Navbar, MobileNav)
5. Auth pages + service
6. Product listing + detail + search
7. Cart (Zustand slice + UI)
8. Checkout (map + scanner)
9. Orders + live tracking (WebSocket)
10. Admin panel
11. Driver dashboard
