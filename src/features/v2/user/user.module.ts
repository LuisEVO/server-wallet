import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../../prisma.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
