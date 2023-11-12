import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class WalletV2Repository {
  constructor(private readonly prisma: PrismaService) {}

  async aggregateSum(params: {
    _sum: Prisma.WalletV2SumAggregateInputType;
    where: Prisma.WalletV2WhereInput;
  }) {
    const { _sum, where } = params;
    return this.prisma.walletV2.aggregate({
      _sum,
      where,
    });
  }

  async findUnique(where: Prisma.WalletV2WhereUniqueInput) {
    return this.prisma.walletV2.findUnique({
      where,
    });
  }

  async findFirst(params: { where?: Prisma.WalletV2WhereInput }) {
    const { where } = params;
    return this.prisma.walletV2.findFirst({
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WalletV2WhereUniqueInput;
    where?: Prisma.WalletV2WhereInput;
    orderBy?: Prisma.WalletV2OrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.walletV2.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.WalletV2UncheckedCreateInput) {
    return this.prisma.walletV2.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.WalletV2WhereUniqueInput;
    data: Prisma.WalletV2UpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.walletV2.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.WalletV2WhereUniqueInput) {
    return this.prisma.walletV2.delete({
      where,
    });
  }
}
