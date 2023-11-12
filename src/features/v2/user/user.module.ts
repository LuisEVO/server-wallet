import { Module } from '@nestjs/common';
import { UserV2Service } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../../prisma.service';
import { UserV2Repository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserV2Repository, UserV2Service],
  exports: [UserV2Service],
})
export class UserV2Module {}
