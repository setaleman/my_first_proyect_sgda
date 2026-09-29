import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed...');

  // Limpiar datos existentes
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();
  console.log('Cleaning existing data...');

  // Crear Tenants
  console.log('Creating tenants...');
  const tenant1 = await prisma.tenant.create({
    data: { name: 'Tech Solutions' },
  });
  await prisma.tenant.create({
    data: { name: 'Marketing Pro' },
  });
  await prisma.tenant.create({
    data: { name: 'Consulting Exp' },
  });

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Crear usuario inicial
  await prisma.user.create({
    data: {
      email: 'admin@techsolutions.com',
      name: 'Admin User',
      password: hashedPassword,
      tenantId: tenant1.id,
      role: 'ADMIN',
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });