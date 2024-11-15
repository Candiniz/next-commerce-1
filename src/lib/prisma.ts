import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;  // Atribui a instância do Prisma no ambiente de desenvolvimento
}

export default prisma;
