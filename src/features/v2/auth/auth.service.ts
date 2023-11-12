import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AuthDto } from './auth.dto';
import { UserV2Service } from '../user/user.service';
import { UserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserV2Service,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: UserDto): Promise<any> {
    const hash = await argon2.hash(createUserDto.password);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.id);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshToken(userId: number) {
    // Check if user exists
    const tokens = await this.getTokens(userId);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);
  }

  private async getTokens(userId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_SECRET_EXPIRED_IN',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_SECRET_EXPIRED_IN',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
