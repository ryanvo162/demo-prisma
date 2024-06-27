# Demo Prisma with PostgreSQL

## Getting Started

### Setup

```bash
docker compose build
docker compose up -d
docker compose exec server /bin/sh
```

### Create Migration

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### Try it

Open your browser and go to [http://localhost:1060](http://localhost:1060)
