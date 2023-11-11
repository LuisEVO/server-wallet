import { Module } from '@nestjs/common';
import { WalletV1Controller } from './wallet.controller';
import { WalletV1Service } from './wallet.service';
import { PrismaService } from '../../../prisma.service';
import { WalletV1Repository } from './wallet.repository';

@Module({
  controllers: [WalletV1Controller],
  providers: [PrismaService, WalletV1Repository, WalletV1Service],
  exports: [WalletV1Service],
})
export class WalletV1Module {}
