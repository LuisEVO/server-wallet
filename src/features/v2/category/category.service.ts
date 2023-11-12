import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryModel } from './category.model';
import { CategoryV2Repository } from './category.repository';

@Injectable()
export class CategoryV2Service {
  constructor(private readonly repository: CategoryV2Repository) {}

  async findById(userId: number, id: number): Promise<CategoryModel | null> {
    const category = await this.repository.findUnique({
      userId,
      id,
    });

    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }

    return category;
  }

  async findByName(
    userId: number,
    name: string,
  ): Promise<CategoryModel | null> {
    return this.repository.findFirst({
      where: { userId, name },
    });
  }

  async findByNameExcludeThis(
    userId: number,
    id: number,
    name: string,
  ): Promise<CategoryModel | null> {
    return this.repository.findFirst({
      where: {
        userId,
        name,
        NOT: { id, userId },
      },
    });
  }

  async findMany(userId: number): Promise<CategoryModel[]> {
    return this.repository.findMany({ where: { userId } });
  }

  async create(userId: number, data: CategoryDto): Promise<CategoryModel> {
    const category = await this.findByName(userId, data.name);
    if (category) {
      throw new ConflictException('Category already exists');
    }

    return this.repository.create({ userId, ...data });
  }

  async update(
    userId: number,
    id: number,
    data: CategoryDto,
  ): Promise<CategoryModel> {
    await this.findById(userId, id);

    const category = await this.findByNameExcludeThis(userId, id, data.name);
    if (category) {
      throw new ConflictException('Category with that name already exists');
    }

    return this.repository.update({
      data,
      where: { userId, id },
    });
  }

  async delete(userId: number, id: number): Promise<CategoryModel> {
    const category = await this.repository.findUnique({
      userId,
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
