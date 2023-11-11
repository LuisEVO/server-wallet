import { OmitType } from '@nestjs/swagger';
import { UserModel } from './user.model';

export class UserDto extends OmitType(UserModel, [
  'id',
  'refreshToken',
] as const) {}
