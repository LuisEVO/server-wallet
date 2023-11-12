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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../common/guards/access-token.guard';
import { WalletDto } from './wallet.dto';
import { WalletAmountModel, WalletModel } from './wallet.model';
import { WalletV2Service } from './wallet.service';
import { Request } from 'express';

@ApiTags('wallet')
@UseGuards(AccessTokenGuard)
@Controller({ version: '2', path: 'wallet' })
export class WalletV2Controller {
  constructor(private readonly service: WalletV2Service) {}

  @ApiOkResponse({
    type: WalletAmountModel,
  })
  @Get('total')
  async getTotal(@Req() req: Request) {
    return this.service.getTotal(req.user['sub']);
  }

  @ApiOkResponse({
    type: WalletModel,
  })
  @Get(':id')
  async getById(@Req() req: Request, @Param('id') id: string) {
    return this.service.findById(req.user['sub'], Number(id));
  }

  @ApiOkResponse({
    type: [WalletModel],
  })
  @Get()
  async getAll(@Req() req: Request) {
    return this.service.findMany(req.user['sub']);
  }

  @ApiCreatedResponse({
    type: WalletModel,
  })
  @Post()
  async create(
    @Req() req: Request,
    @Body(new ValidationPipe()) data: WalletDto,
  ) {
    return this.service.create(req.user['sub'], data);
  }

  @ApiOkResponse({
    type: WalletModel,
  })
  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: WalletDto,
  ) {
    return this.service.update(req.user['sub'], Number(id), data);
  }

  @ApiOkResponse({
    type: WalletModel,
  })
  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.service.delete(req.user['sub'], Number(id));
  }
}
