import { PrismaClient } from '@prisma/client';
export const DB = new PrismaClient();

const expenses: string[] = [
  'Comida y bebida',
  'Facturas y Utilidades',
  'Transporte',
  'Compras',
  'Familia',
  'Médico',
  'Educación',
  'Entretenimiento',
  'Regalos',
  'Seguros',
  'Otros Gastos',
];

const income: string[] = ['Salario', 'Premio', 'Otros Ingresos'];

const seed = async () => {
  await Promise.all(
    expenses.map((name) =>
      DB.categoryV1.create({
        data: {
          name,
          type: 'gasto',
        },
      }),
    ),
  );
  await Promise.all(
    income.map((name) =>
      DB.categoryV1.create({
        data: {
          name,
          type: 'ingreso',
        },
      }),
    ),
  );
};

seed();
