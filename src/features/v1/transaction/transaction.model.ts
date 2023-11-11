import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsObject, IsString } from 'class-validator';
import { CategoryModel } from '../category/category.model';

export class TransactionModel {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsDateString()
  date: Date;
}

export class TransactionWithRalationIdsModel extends TransactionModel {
  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsNumber()
  walletId: number;
}

export class TransactionWithCategoryModel extends TransactionModel {
  @ApiProperty()
  @IsObject()
  category: CategoryModel;
}
