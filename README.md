# MoneyMate

MoneyMate is a fully responsive financial management application with role-based access control (admin and user roles). It allows users to track income and expenses, organize them by categories, and filter/search through transactions. Admins can manage categories and users from a dedicated panel.

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Default Credentials](#default-credentials)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Key Features

- Add, edit, and delete income and expense transactions
- Organize transactions by category (Food, Transport, Health, etc.)
- Filter and search transactions
- Dashboard with financial overview
- Role-based authorization (admin / user)
- Admin panel for managing categories and users
- Dark / light mode toggle
- Fully responsive UI

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **Next.js 15** (React 19) | Framework with App Router |
| **TypeScript** | Type safety |
| **RTK Query** (Redux Toolkit) | Server state & API calls |
| **Tailwind CSS** | Styling |
| **shadcn/ui** + Radix UI | UI component library |
| **React Hook Form** + Zod | Form handling & validation |
| **next-themes** | Dark / light mode |
| **Sonner** | Toast notifications |
| **Lucide React** | Icons |

### Backend

| Technology | Purpose |
|---|---|
| **Laravel 12** (PHP 8.2+) | REST API framework |
| **Laravel Sanctum** | Token-based API authentication |
| **MySQL** | Relational database |

---

## Prerequisites

Make sure the following are installed before starting:

- **Node.js** 20 or higher
- **npm** (comes with Node.js)
- **PHP** 8.2 or higher
- **Composer** (PHP package manager)
- **MySQL** 8 or higher

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/marek-kramarczyk/MoneyMate.git
cd MoneyMate
```

### 2. Backend Setup (Laravel API)

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Copy the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=moneymate
DB_USERNAME=root
DB_PASSWORD=your_password
```

Run migrations and seed the database:

```bash
php artisan migrate --seed
```

This creates all tables and populates default roles, categories, types (income/expense), and demo users.

Start the development server:

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`.

### 3. Frontend Setup (Next.js)

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env.local
```

Set the API URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000/money-mate](http://localhost:3000/money-mate) in your browser.

> **Note:** The frontend is served under the `/money-mate` base path (configured in `next.config.ts`).

---

## Architecture

### Directory Structure

```
MoneyMate/
├── frontend/                      # Next.js application
│   └── src/
│       ├── app/                   # App Router pages
│       │   ├── (auth)/            # Public routes: login, sign-up
│       │   └── (protected)/       # Auth-required routes
│       │       ├── (user)/        # dashboard, transactions, profile
│       │       └── admin/         # admin panel, categories, users
│       ├── components/
│       │   ├── auth/              # Login/register forms
│       │   ├── protected/
│       │   │   ├── admin/         # Admin-only UI components
│       │   │   └── shared/        # Navbar, sidebar
│       │   ├── ui/                # shadcn/ui primitives
│       │   └── providers/         # Redux & Theme providers
│       └── lib/
│           ├── hooks/             # Custom hooks (useTransactions, etc.)
│           ├── state/             # Redux store & RTK Query slices
│           │   ├── store.ts
│           │   ├── base-query.ts  # Axios base config with token injection
│           │   └── features/      # auth, transactions, categories, types, users
│           ├── types.ts           # Shared TypeScript types
│           ├── zod-schemas.ts     # Form validation schemas
│           └── vars.ts            # Nav links, constants
│
└── backend/                       # Laravel application
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/       # Request handlers
    │   │   │   ├── Auth/          # Login, register, logout
    │   │   │   ├── TransactionController.php
    │   │   │   ├── CategoryController.php
    │   │   │   ├── TypeController.php
    │   │   │   └── UserController.php
    │   │   ├── Middleware/        # RoleMiddleware, etc.
    │   │   ├── Requests/          # Form request validation
    │   │   └── Resources/         # JSON response transformers
    │   └── Models/                # Eloquent models
    ├── database/
    │   ├── migrations/            # Schema definitions
    │   └── seeders/               # Seed data
    └── routes/
        └── api.php                # All API route definitions
```

### Request Flow

```
Browser → Next.js page → RTK Query hook → Laravel API → MySQL
                                      ↑
                          Sanctum token in Authorization header
```

### Authentication Flow

1. User submits credentials to `POST /api/auth/login`
2. Laravel validates credentials and returns a Sanctum token
3. RTK Query stores the token; `base-query.ts` attaches it as a `Bearer` header on every subsequent request
4. Protected Next.js routes check for a valid session before rendering

---

## Database Schema

```
roles
├── id
└── name                 (admin, user)

users
├── id
├── name
├── email                (unique)
├── password
├── role_id              → roles.id
└── timestamps

categories
├── id
├── name                 (Food, Transport, Entertainment, Health, Education, Housing, Utilities, Clothing, Travel, Other)
└── timestamps

types
├── id
├── name                 (income, expense)
└── timestamps

transactions
├── id
├── name
├── amount               (decimal)
├── date
├── user_id              → users.id
├── type_id              → types.id
├── category_id          → categories.id
└── timestamps

personal_access_tokens   (Sanctum)
sessions
cache
jobs
```

---

## API Reference

**Base URL:** `http://localhost:8000/api`

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Log in and receive a token |

### Authenticated Endpoints

All requests require the header: `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/logout` | Revoke current token |
| `DELETE` | `/auth/delete` | Delete own account |
| `GET` | `/user` | Get authenticated user info |
| `GET` | `/categories` | List all categories |
| `GET` | `/types` | List transaction types (income / expense) |
| `GET` | `/transactions` | List current user's transactions |
| `POST` | `/transactions` | Create a transaction |
| `PUT` | `/transactions/{id}` | Update a transaction |
| `DELETE` | `/transactions/{id}` | Delete a transaction |

### Admin-Only Endpoints

Requires admin role in addition to authentication.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/categories` | Create a category |
| `DELETE` | `/categories/{id}` | Delete a category |
| `GET` | `/users` | List all users |
| `DELETE` | `/users/{id}` | Delete a user |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `APP_KEY` | Laravel app encryption key | Generated by `php artisan key:generate` |
| `APP_URL` | Backend URL | `http://localhost:8000` |
| `DB_CONNECTION` | Database driver | `mysql` |
| `DB_HOST` | Database host | `127.0.0.1` |
| `DB_PORT` | Database port | `3306` |
| `DB_DATABASE` | Database name | `api` |
| `DB_USERNAME` | Database user | `root` |
| `DB_PASSWORD` | Database password | _(empty)_ |
| `SESSION_DRIVER` | Session storage | `database` |
| `CACHE_STORE` | Cache storage | `database` |
| `QUEUE_CONNECTION` | Queue driver | `database` |

### Frontend (`frontend/.env.local`)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Laravel API base URL | `http://localhost:8000` |

---

## Available Scripts

### Frontend

```bash
npm run dev      # Start dev server with Turbopack at http://localhost:3000
npm run build    # Build for production
npm start        # Serve production build
npm run lint     # Run ESLint
```

### Backend

```bash
php artisan serve                  # Start dev server at http://localhost:8000
php artisan migrate                # Run pending migrations
php artisan migrate:fresh --seed   # Drop all tables, re-run migrations, seed
php artisan db:seed                # Seed without re-migrating
php artisan key:generate           # Generate APP_KEY
php artisan tinker                 # Interactive REPL
composer test                      # Run PHPUnit tests
```

---

## Default Credentials

After running `php artisan migrate --seed`, two demo accounts are available:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@admin.pl` | `Admin123.` |
| User | `user@user.pl` | `User123.` |

---

## Deployment

No platform-specific config files are included. Below are common deployment targets.

### Frontend — Vercel (recommended for Next.js)

1. Push the `frontend/` directory to a GitHub repository (or use a monorepo)
2. Import the project on [vercel.com](https://vercel.com)
3. Set root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-api-domain.com`
5. Deploy

### Backend — Shared Hosting / VPS

```bash
# On the server
git pull origin main
cd backend
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan migrate --force
```

Point your web server document root to `backend/public/`.

Configure a virtual host (Nginx example):

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/moneymate/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

Don't forget to configure CORS in `backend/config/cors.php` to allow your frontend domain.

---

## Troubleshooting

### `CORS error` when frontend calls the API

Open `backend/config/cors.php` and add your frontend URL to `allowed_origins`:

```php
'allowed_origins' => ['http://localhost:3000', 'https://your-frontend-domain.com'],
```

### `php artisan migrate` fails — database connection refused

1. Ensure MySQL is running
2. Verify credentials in `backend/.env` match your local MySQL setup
3. Create the database manually if it doesn't exist:
   ```sql
   CREATE DATABASE moneymate;
   ```

### Frontend shows blank page at `/`

The app is served under the `/money-mate` base path. Navigate to [http://localhost:3000/money-mate](http://localhost:3000/money-mate).

### `npm run dev` fails — missing modules

```bash
cd frontend
rm -rf node_modules
npm install
```

### Token not sent to API — all requests return 401

Check that `NEXT_PUBLIC_API_URL` is set correctly in `frontend/.env.local` and does **not** have a trailing slash:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Laravel returns 419 (CSRF) on login

For Sanctum SPA authentication, ensure `SANCTUM_STATEFUL_DOMAINS` includes your frontend domain in `backend/.env`:

```env
SANCTUM_STATEFUL_DOMAINS=localhost:3000
```
