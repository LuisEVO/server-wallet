import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionV1Repository {
  private select: Prisma.TransactionSelect = {
    id: true,
    amount: true,
    note: true,
    date: true,
    category: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findUnique(where: Prisma.TransactionWhereUniqueInput) {
    return this.prisma.transaction.findUnique({
      where,
      select: this.select,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TransactionWhereUniqueInput;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.transaction.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: this.select,
    });
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    return this.prisma.transaction.create({
      data,
      select: this.select,
    });
  }

  async update(params: {
    where: Prisma.TransactionWhereUniqueInput;
    data: Prisma.TransactionUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.transaction.update({
      data,
      where,
      select: this.select,
    });
  }

  async delete(where: Prisma.TransactionWhereUniqueInput) {
    return this.prisma.transaction.delete({
      where,
    });
  }
}
