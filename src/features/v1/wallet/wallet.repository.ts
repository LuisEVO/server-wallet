import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class WalletV1Repository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(where: Prisma.WalletWhereUniqueInput) {
    return this.prisma.wallet.findUnique({
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WalletWhereUniqueInput;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.wallet.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.WalletCreateInput) {
    return this.prisma.wallet.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.WalletWhereUniqueInput;
    data: Prisma.WalletUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.wallet.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.WalletWhereUniqueInput) {
    return this.prisma.wallet.delete({
      where,
    });
  }
}
