import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { CategoryModel } from '../category/category.model';
import { Type } from 'class-transformer';

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

export class TransactionFilters {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pageSize: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  walletId: number;
}
