# Product CRUD (Next.js 15 + Prisma)

This is a complete CRUD example built with Next.js 15 (App Router), React 19, Prisma, and Tailwind CSS v4.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Initialize Database**:
   ```bash
   npx prisma migrate dev
   ```

3. **Run Server**:
   ```bash
   npm run dev
   ```
   Access at [http://localhost:3000/products](http://localhost:3000/products)

## Features

- **Next.js 15**: App Router, Server Actions, `next/form`.
- **React 19**: `useActionState`, `useOptimistic`, `useTransition`.
- **Prisma**: SQLite database with repository pattern (`lib/productRepo.ts`).
- **Tailwind v4**: CSS-first configuration.

## API Usage

### GET /api/products
List products with filtering and pagination.

```bash
# List all
curl http://localhost:3000/api/products

# Filter by name and status
curl "http://localhost:3000/api/products?query=Test&status=active"

# Sort by price descending
curl "http://localhost:3000/api/products?sort=price:desc"
```

### POST /api/products
Create a new product.

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Mouse",
    "sku": "GM-001",
    "price": 59.99,
    "stock": 100,
    "category": "Electronics"
  }'
```

### PATCH /api/products/[id]
Update a product.

```bash
curl -X PATCH http://localhost:3000/api/products/YOUR_PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 49.99,
    "stock": 95
  }'
```
