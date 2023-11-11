import { Module } from '@nestjs/common';
import { CategoryV1Controller } from './category.controller';
import { CategoryV1Service } from './category.service';
import { PrismaService } from '../../../prisma.service';
import { CategoryV1Repository } from './category.repository';

@Module({
  controllers: [CategoryV1Controller],
  providers: [PrismaService, CategoryV1Repository, CategoryV1Service],
  exports: [CategoryV1Service],
})
export class CategoryV1Module {}
