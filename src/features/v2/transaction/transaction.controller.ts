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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from '../../../common/guards/access-token.guard';
import { TransactionDto } from './transaction.dto';
import {
  TransactionFilters,
  TransactionWithCategoryModel,
  TransactionWithRalationIdsModel,
} from './transaction.model';
import { TransactionV2Service } from './transaction.service';

@ApiTags('transaction')
@UseGuards(AccessTokenGuard)
@Controller({ version: '2', path: 'transaction' })
export class TransactionV2Controller {
  constructor(private readonly service: TransactionV2Service) {}

  @ApiOkResponse({
    type: TransactionWithCategoryModel,
  })
  @Get(':id')
  async getById(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.service.findById(req.user['sub'], id);
  }

  @ApiOkResponse({
    type: [TransactionWithCategoryModel],
  })
  @Get()
  async getAll(@Req() req: Request, @Query() query: TransactionFilters) {
    return this.service.findMany(req.user['sub'], query);
  }

  @ApiCreatedResponse({
    type: TransactionWithCategoryModel,
  })
  @Post()
  async create(@Req() req: Request, @Body() data: TransactionDto) {
    return this.service.create(req.user['sub'], data);
  }

  @ApiOkResponse({
    type: TransactionWithCategoryModel,
  })
  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TransactionDto,
  ) {
    return this.service.update(req.user['sub'], id, data);
  }

  @ApiOkResponse({
    type: TransactionWithRalationIdsModel,
  })
  @Delete(':id')
  async delete(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.service.delete(req.user['sub'], id);
  }
}
