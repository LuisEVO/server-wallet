import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CategoryV1, Prisma } from '@prisma/client';

@Injectable()
export class CategoryV1Repository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(
    whereUniqueInput: Prisma.CategoryV1WhereUniqueInput,
  ): Promise<CategoryV1 | null> {
    return this.prisma.categoryV1.findUnique({
      where: whereUniqueInput,
    });
  }

  async findFirst(params: { where?: Prisma.CategoryV1WhereInput }) {
    const { where } = params;
    return this.prisma.categoryV1.findFirst({
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryV1WhereUniqueInput;
    where?: Prisma.CategoryV1WhereInput;
    orderBy?: Prisma.CategoryV1OrderByWithRelationInput;
  }): Promise<CategoryV1[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.categoryV1.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.CategoryV1CreateInput): Promise<CategoryV1> {
    return this.prisma.categoryV1.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.CategoryV1WhereUniqueInput;
    data: Prisma.CategoryV1UpdateInput;
  }): Promise<CategoryV1> {
    const { where, data } = params;
    return this.prisma.categoryV1.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.CategoryV1WhereUniqueInput): Promise<CategoryV1> {
    return this.prisma.categoryV1.delete({
      where,
    });
  }
}
