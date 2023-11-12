import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CategoryV2, Prisma } from '@prisma/client';

@Injectable()
export class CategoryV2Repository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(
    whereUniqueInput: Prisma.CategoryV2WhereUniqueInput,
  ): Promise<CategoryV2 | null> {
    return this.prisma.categoryV2.findUnique({
      where: whereUniqueInput,
    });
  }

  async findFirst(params: { where?: Prisma.CategoryV2WhereInput }) {
    const { where } = params;
    return this.prisma.categoryV2.findFirst({
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryV2WhereUniqueInput;
    where?: Prisma.CategoryV2WhereInput;
    orderBy?: Prisma.CategoryV2OrderByWithRelationInput;
  }): Promise<CategoryV2[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.categoryV2.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(
    data: Prisma.CategoryV2UncheckedCreateInput,
  ): Promise<CategoryV2> {
    return this.prisma.categoryV2.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.CategoryV2WhereUniqueInput;
    data: Prisma.CategoryV2UpdateInput;
  }): Promise<CategoryV2> {
    const { where, data } = params;
    return this.prisma.categoryV2.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.CategoryV2WhereUniqueInput): Promise<CategoryV2> {
    return this.prisma.categoryV2.delete({
      where,
    });
  }
}
