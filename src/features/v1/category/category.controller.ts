import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryV1Service } from './category.service';
import { CategoryDto } from './category.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryModel } from './category.model';

@ApiTags('category')
@Controller({ version: '1', path: 'category' })
export class CategoryV1Controller {
  constructor(private readonly service: CategoryV1Service) {}

  @ApiOkResponse({
    type: CategoryModel,
  })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }

  @ApiOkResponse({
    type: [CategoryModel],
  })
  @Get()
  async getAll() {
    return this.service.findMany();
  }

  @ApiCreatedResponse({
    type: CategoryModel,
  })
  @Post()
  async create(@Body(new ValidationPipe()) data: CategoryDto) {
    return this.service.create(data);
  }

  @ApiOkResponse({
    type: CategoryModel,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: CategoryDto,
  ) {
    return this.service.update(Number(id), data);
  }

  @ApiOkResponse({
    type: CategoryModel,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
