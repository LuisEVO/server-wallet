import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionV2Repository {
  private select: Prisma.TransactionV2Select = {
    id: true,
    amount: true,
    note: true,
    date: true,
    categoryId: true,
    category: true,
    walletId: true,
    wallet: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findUnique(where: Prisma.TransactionV2WhereUniqueInput) {
    return this.prisma.transactionV2.findUnique({
      where,
      select: this.select,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TransactionV2WhereUniqueInput;
    where?: Prisma.TransactionV2WhereInput;
    orderBy?: Prisma.TransactionV2OrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.transactionV2.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: this.select,
    });
  }

  async create(data: Prisma.TransactionV2UncheckedCreateInput) {
    return this.prisma.transactionV2.create({
      data,
      select: this.select,
    });
  }

  async update(params: {
    where: Prisma.TransactionV2WhereUniqueInput;
    data: Prisma.TransactionV2UpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.transactionV2.update({
      data,
      where,
      select: this.select,
    });
  }

  async delete(where: Prisma.TransactionV2WhereUniqueInput) {
    return this.prisma.transactionV2.delete({
      where,
    });
  }
}
