# Node.js App with TypeScript and Prisma

A backend application built with **Node.js**, **TypeScript**, and **Prisma ORM**.

---

## 📋 Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  
- [PostgreSQL](https://www.postgresql.org/) or another supported database  
- [Prisma CLI](https://www.prisma.io/docs/getting-started)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd <project-folder>
```
```bash
npm install
```
### Configure environment variables
```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb?schema=public"
```

```bash
npx prisma generate
npx prisma migrate dev --name init
```

```bash
npm run dev
```
