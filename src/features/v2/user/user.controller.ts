import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserV2Service } from './user.service';
import { UserDto } from './user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './user.model';
import { AccessTokenGuard } from '../../../common/guards/access-token.guard';

@ApiTags('user')
@UseGuards(AccessTokenGuard)
@Controller({ version: '2', path: 'user' })
export class UserController {
  constructor(private readonly service: UserV2Service) {}

  @ApiOkResponse({
    type: UserModel,
  })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }

  @ApiOkResponse({
    type: [UserModel],
  })
  @Get()
  async getAll() {
    return this.service.findMany();
  }

  @ApiCreatedResponse({
    type: UserModel,
  })
  @Post()
  async create(@Body(new ValidationPipe()) data: UserDto) {
    return this.service.create(data);
  }

  @ApiOkResponse({
    type: UserModel,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: UserDto,
  ) {
    return this.service.update(Number(id), data);
  }

  @ApiOkResponse({
    type: UserModel,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
