import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryModel } from './category.model';
import { CategoryV1Repository } from './category.repository';

@Injectable()
export class CategoryV1Service {
  constructor(private readonly repository: CategoryV1Repository) {}

  async findById(id: number): Promise<CategoryModel | null> {
    const category = await this.repository.findUnique({
      id,
    });

    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }

    return category;
  }

  async findByName(name: string): Promise<CategoryModel | null> {
    return this.repository.findFirst({
      where: { name },
    });
  }

  async findByNameExcludeThis(
    id: number,
    name: string,
  ): Promise<CategoryModel | null> {
    return this.repository.findFirst({
      where: {
        name,
        NOT: { id },
      },
    });
  }

  async findMany(): Promise<CategoryModel[]> {
    return this.repository.findMany({});
  }

  async create(data: CategoryDto): Promise<CategoryModel> {
    const category = await this.findByName(data.name);
    if (category) {
      throw new ConflictException('Category already exists');
    }

    return this.repository.create(data);
  }

  async update(id: number, data: CategoryDto): Promise<CategoryModel> {
    const category = await this.findByNameExcludeThis(id, data.name);
    if (category) {
      throw new ConflictException('Category already exists');
    }

    return this.repository.update({
      data,
      where: { id },
    });
  }

  async delete(id: number): Promise<CategoryModel> {
    const category = await this.repository.findUnique({
      id,
    });

    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }

    return this.repository.delete({
      id,
    });
  }
}
