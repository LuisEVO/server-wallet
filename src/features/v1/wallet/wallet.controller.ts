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
import { WalletV1Service } from './wallet.service';
import { WalletDto } from './wallet.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletModel } from './wallet.model';

@ApiTags('wallet')
@Controller({ version: '1', path: 'wallet' })
export class WalletV1Controller {
  constructor(private readonly service: WalletV1Service) {}

  @ApiOkResponse({
    type: WalletModel,
  })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }

  @ApiOkResponse({
    type: [WalletModel],
  })
  @Get()
  async getAll() {
    return this.service.findMany();
  }

  @ApiCreatedResponse({
    type: WalletModel,
  })
  @Post()
  async create(@Body(new ValidationPipe()) data: WalletDto) {
    return this.service.create(data);
  }

  @ApiOkResponse({
    type: WalletModel,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: WalletDto,
  ) {
    return this.service.update(Number(id), data);
  }

  @ApiOkResponse({
    type: WalletModel,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
