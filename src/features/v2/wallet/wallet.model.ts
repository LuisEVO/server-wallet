import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class WalletAmountModel {
  @ApiProperty()
  @IsNumber()
  amount: number;
}

export class WalletModel extends WalletAmountModel {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}
