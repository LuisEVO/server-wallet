import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RefreshTokenGuard } from '../../../common/guards/refresh-token.guard.ts.js';
import { UserDto } from '../user/user.dto';
import { AuthDto } from './auth.dto.js';
import { AuthService } from './auth.service.js';

@ApiTags('auth')
@Controller({ version: '2', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createUserDto: UserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  signIn(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh/token')
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req.user['sub']);
  }
}
