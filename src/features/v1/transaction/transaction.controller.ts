import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransactionDto } from './transaction.dto';
import {
  TransactionWithCategoryModel,
  TransactionWithRalationIdsModel,
} from './transaction.model';
import { TransactionV1Service } from './transaction.service';

@ApiTags('transaction')
@Controller({ version: '1', path: 'transaction' })
export class TransactionV1Controller {
  constructor(private readonly service: TransactionV1Service) {}

  @ApiOkResponse({
    type: TransactionWithCategoryModel,
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @ApiOkResponse({
    type: [TransactionWithCategoryModel],
  })
  @Get()
  async getAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    return this.service.findMany({ page, pageSize });
  }

  @ApiCreatedResponse({
    type: TransactionWithCategoryModel,
  })
  @Post()
  async create(@Body() data: TransactionDto) {
    return this.service.create(data);
  }

  @ApiOkResponse({
    type: TransactionWithCategoryModel,
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TransactionDto,
  ) {
    return this.service.update(id, data);
  }

  @ApiOkResponse({
    type: TransactionWithRalationIdsModel,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
