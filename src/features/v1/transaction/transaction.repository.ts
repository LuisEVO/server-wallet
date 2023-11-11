import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionV1Repository {
  private select: Prisma.TransactionV1Select = {
    id: true,
    amount: true,
    note: true,
    date: true,
    category: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findUnique(where: Prisma.TransactionV1WhereUniqueInput) {
    return this.prisma.transactionV1.findUnique({
      where,
      select: this.select,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TransactionV1WhereUniqueInput;
    where?: Prisma.TransactionV1WhereInput;
    orderBy?: Prisma.TransactionV1OrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.transactionV1.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: this.select,
    });
  }

  async create(data: Prisma.TransactionV1UncheckedCreateInput) {
    return this.prisma.transactionV1.create({
      data,
      select: this.select,
    });
  }

  async update(params: {
    where: Prisma.TransactionV1WhereUniqueInput;
    data: Prisma.TransactionV1UpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.transactionV1.update({
      data,
      where,
      select: this.select,
    });
  }

  async delete(where: Prisma.TransactionV1WhereUniqueInput) {
    return this.prisma.transactionV1.delete({
      where,
    });
  }
}
