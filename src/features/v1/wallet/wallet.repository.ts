import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class WalletV1Repository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(where: Prisma.WalletV1WhereUniqueInput) {
    return this.prisma.walletV1.findUnique({
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WalletV1WhereUniqueInput;
    where?: Prisma.WalletV1WhereInput;
    orderBy?: Prisma.WalletV1OrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.walletV1.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.WalletV1CreateInput) {
    return this.prisma.walletV1.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.WalletV1WhereUniqueInput;
    data: Prisma.WalletV1UpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.walletV1.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.WalletV1WhereUniqueInput) {
    return this.prisma.walletV1.delete({
      where,
    });
  }
}
