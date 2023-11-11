import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CategoryV1Module } from './features/v1/category/category.module';
import { TransactionV1Module } from './features/v1/transaction/transaction.module';
import { WalletV1Module } from './features/v1/wallet/wallet.module';
import { AuthModule } from './features/v2/auth/auth.module';
import { UserModule } from './features/v2/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({}),
    WalletV1Module,
    CategoryV1Module,
    TransactionV1Module,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
