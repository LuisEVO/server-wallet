import { Module } from '@nestjs/common';
import { WalletV2Controller } from './wallet.controller';
import { WalletV2Service } from './wallet.service';
import { PrismaService } from '../../../prisma.service';
import { WalletV2Repository } from './wallet.repository';

@Module({
  controllers: [WalletV2Controller],
  providers: [PrismaService, WalletV2Repository, WalletV2Service],
  exports: [WalletV2Service],
})
export class WalletV2Module {}
