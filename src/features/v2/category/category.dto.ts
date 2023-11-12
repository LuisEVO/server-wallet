import { OmitType } from '@nestjs/swagger';
import { CategoryModel } from './category.model';

export class CategoryDto extends OmitType(CategoryModel, ['id'] as const) {}
