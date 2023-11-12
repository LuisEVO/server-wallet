import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CategoryV1Module } from './features/v1/category/category.module';
import { TransactionV1Module } from './features/v1/transaction/transaction.module';
import { WalletV1Module } from './features/v1/wallet/wallet.module';
import { AuthModule } from './features/v2/auth/auth.module';
import { UserV2Module } from './features/v2/user/user.module';
import { WalletV2Module } from './features/v2/wallet/wallet.module';
import { CategoryV2Module } from './features/v2/category/category.module';
import { TransactionV2Module } from './features/v2/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({}),
    WalletV1Module,
    CategoryV1Module,
    TransactionV1Module,
    UserV2Module,
    WalletV2Module,
    CategoryV2Module,
    TransactionV2Module,
    AuthModule,
  ],
})
export class AppModule {}
