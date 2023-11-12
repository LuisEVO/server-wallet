import { Module } from '@nestjs/common';
import { CategoryV2Controller } from './category.controller';
import { CategoryV2Service } from './category.service';
import { PrismaService } from '../../../prisma.service';
import { CategoryV2Repository } from './category.repository';

@Module({
  controllers: [CategoryV2Controller],
  providers: [PrismaService, CategoryV2Repository, CategoryV2Service],
  exports: [CategoryV2Service],
})
export class CategoryV2Module {}
