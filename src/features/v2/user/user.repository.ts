import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { UserV2, Prisma } from '@prisma/client';

@Injectable()
export class UserV2Repository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(
    whereUniqueInput: Prisma.UserV2WhereUniqueInput,
  ): Promise<UserV2 | null> {
    return this.prisma.userV2.findUnique({
      where: whereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserV2WhereUniqueInput;
    where?: Prisma.UserV2WhereInput;
    orderBy?: Prisma.UserV2OrderByWithRelationInput;
  }): Promise<UserV2[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userV2.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.UserV2CreateInput): Promise<UserV2> {
    return this.prisma.userV2.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.UserV2WhereUniqueInput;
    data: Prisma.UserV2UpdateInput;
  }): Promise<UserV2> {
    const { where, data } = params;
    return this.prisma.userV2.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserV2WhereUniqueInput): Promise<UserV2> {
    return this.prisma.userV2.delete({
      where,
    });
  }
}
