import { Module } from '@nestjs/common';
import { TransactionV2Controller } from './transaction.controller';
import { TransactionV2Service } from './transaction.service';
import { PrismaService } from '../../../prisma.service';
import { TransactionV2Repository } from './transaction.repository';
import { CategoryV2Module } from '../category/category.module';
import { WalletV2Module } from '../wallet/wallet.module';

@Module({
  controllers: [TransactionV2Controller],
  providers: [PrismaService, TransactionV2Repository, TransactionV2Service],
  imports: [CategoryV2Module, WalletV2Module],
})
export class TransactionV2Module {}
