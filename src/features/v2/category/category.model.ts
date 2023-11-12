import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

enum CategoryType {
  spent = 'gasto',
  income = 'ingreso',
}

export class CategoryModel {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    enum: CategoryType,
  })
  @IsEnum(CategoryType)
  type: string;
}
