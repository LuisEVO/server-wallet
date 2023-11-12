import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryV2Service } from './category.service';
import { CategoryDto } from './category.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryModel } from './category.model';
import { AccessTokenGuard } from '../../../common/guards/access-token.guard';
import { Request } from 'express';

@ApiTags('category')
@UseGuards(AccessTokenGuard)
@Controller({ version: '2', path: 'category' })
export class CategoryV2Controller {
  constructor(private readonly service: CategoryV2Service) {}

  @ApiOkResponse({
    type: CategoryModel,
  })
  @Get(':id')
  async getById(@Req() req: Request, @Param('id') id: string) {
    return this.service.findById(req.user['sub'], Number(id));
  }

  @ApiOkResponse({
    type: [CategoryModel],
  })
  @Get()
  async getAll(@Req() req: Request) {
    return this.service.findMany(req.user['sub']);
  }

  @ApiCreatedResponse({
    type: CategoryModel,
  })
  @Post()
  async create(
    @Req() req: Request,
    @Body(new ValidationPipe()) data: CategoryDto,
  ) {
    return this.service.create(req.user['sub'], data);
  }

  @ApiOkResponse({
    type: CategoryModel,
  })
  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: CategoryDto,
  ) {
    return this.service.update(req.user['sub'], Number(id), data);
  }

  @ApiOkResponse({
    type: CategoryModel,
  })
  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.service.delete(req.user['sub'], Number(id));
  }
}
