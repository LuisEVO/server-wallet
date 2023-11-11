import { Module } from '@nestjs/common';
import { TransactionV1Controller } from './transaction.controller';
import { TransactionV1Service } from './transaction.service';
import { PrismaService } from '../../../prisma.service';
import { TransactionV1Repository } from './transaction.repository';
import { CategoryV1Module } from '../category/category.module';
import { WalletV1Module } from '../wallet/wallet.module';

@Module({
  controllers: [TransactionV1Controller],
  providers: [PrismaService, TransactionV1Repository, TransactionV1Service],
  imports: [CategoryV1Module, WalletV1Module],
})
export class TransactionV1Module {}
